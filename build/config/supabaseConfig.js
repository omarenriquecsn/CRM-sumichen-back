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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldEvidencias = deleteOldEvidencias;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const getUsuarioDesdeToken = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.auth.getUser(accessToken);
    if (error)
        throw new Error(`Token inválido: ${error.message}`);
    return data; // ← Aquí tienes el usuario completo
});
function deleteOldEvidencias() {
    return __awaiter(this, arguments, void 0, function* (days = 60) {
        var _a;
        const bucket = 'evidencia';
        const limit = 1000;
        let offset = 0;
        const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const toDelete = [];
        try {
            while (true) {
                const { data, error } = yield supabase.storage
                    .from(bucket)
                    .list('', { limit, offset, sortBy: { column: 'created_at', order: 'asc' } });
                if (error)
                    throw new Error(error.message);
                if (!data || data.length === 0)
                    break;
                for (const item of data) {
                    // item.created_at puede venir como string; si no existe, probar updated_at
                    const createdAtStr = (_a = item.created_at) !== null && _a !== void 0 ? _a : item.updated_at;
                    if (!createdAtStr)
                        continue;
                    const createdAt = new Date(createdAtStr);
                    if (isNaN(createdAt.getTime()))
                        continue;
                    if (createdAt < threshold) {
                        // usa item.name como path relativo en el bucket
                        toDelete.push(item.name);
                    }
                }
                offset += data.length;
                if (data.length < limit)
                    break;
            }
            if (toDelete.length === 0) {
                return { message: 'No hay archivos antiguos para eliminar', deleted: 0 };
            }
            // borrar en chunks (por ejemplo 100 por petición)
            const chunkSize = 100;
            let deletedCount = 0;
            const errors = [];
            for (let i = 0; i < toDelete.length; i += chunkSize) {
                const chunk = toDelete.slice(i, i + chunkSize);
                const { error } = yield supabase.storage.from(bucket).remove(chunk);
                if (error) {
                    errors.push({ chunk, message: error.message });
                }
                else {
                    deletedCount += chunk.length;
                }
            }
            return { message: 'Proceso completado', attempted: toDelete.length, deleted: deletedCount, errors };
        }
        catch (err) {
            return { message: 'Error durante limpieza', error: err.message };
        }
    });
}
// Declaraciones mínimas para suprimir el error de "implicit any"
