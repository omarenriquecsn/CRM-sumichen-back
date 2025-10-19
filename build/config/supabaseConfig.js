"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioDesdeToken = void 0;
exports.deleteOldEvidencias = deleteOldEvidencias;
// ...existing code...
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '..', '..', '.env') });
const BUCKET = process.env.SUPABASE_CLEANUP_BUCKET || 'evidencias';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
let supabaseClient = null;
function getSupabaseClient() {
    if (supabaseClient)
        return supabaseClient;
    if (!SUPABASE_URL || !SUPABASE_KEY)
        return null;
    supabaseClient = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
    return supabaseClient;
}
const getUsuarioDesdeToken = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const supabase = getSupabaseClient();
    if (!supabase)
        throw new Error('Supabase no configurado: falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY/SUPABASE_KEY');
    const { data, error } = yield supabase.auth.getUser(accessToken);
    if (error)
        throw new Error(`Token inválido: ${error.message}`);
    return data;
});
exports.getUsuarioDesdeToken = getUsuarioDesdeToken;
function deleteOldEvidencias() {
    return __awaiter(this, arguments, void 0, function* (days = 60) {
        var _a, _b;
        const supabase = getSupabaseClient();
        if (!supabase) {
            console.warn('deleteOldEvidencias: Supabase no configurado, operación omitida');
            return { message: 'Supabase not configured', attempted: 0, deleted: 0 };
        }
        const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const toDelete = [];
        const limit = 1000;
        let offset = 0;
        while (true) {
            const { data, error } = yield supabase.storage
                .from(BUCKET)
                .list('', { limit, offset, sortBy: { column: 'created_at', order: 'asc' } });
            if (error)
                throw error;
            if (!data || data.length === 0)
                break;
            for (const item of data) {
                const createdAtStr = (_b = (_a = item.created_at) !== null && _a !== void 0 ? _a : item.updated_at) !== null && _b !== void 0 ? _b : item.last_modified;
                if (!createdAtStr)
                    continue;
                const createdAt = new Date(createdAtStr);
                if (isNaN(createdAt.getTime()))
                    continue;
                if (createdAt < threshold)
                    toDelete.push(item.name);
            }
            if (data.length < limit)
                break;
            offset += data.length;
        }
        if (toDelete.length === 0)
            return { message: 'No old files to delete', deleted: 0, attempted: 0 };
        const chunkSize = 100;
        let deleted = 0;
        const errors = [];
        for (let i = 0; i < toDelete.length; i += chunkSize) {
            const chunk = toDelete.slice(i, i + chunkSize);
            const { error } = yield supabase.storage.from(BUCKET).remove(chunk);
            if (error)
                errors.push({ chunkCount: chunk.length, message: error.message });
            else
                deleted += chunk.length;
        }
        return { message: 'Cleanup finished', attempted: toDelete.length, deleted, errors };
    });
}
// ...existing code...
