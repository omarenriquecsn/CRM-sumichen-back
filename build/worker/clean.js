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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_cron_1 = __importDefault(require("node-cron"));
const supabaseConfig_1 = require("../config/supabaseConfig");
const schedule = process.env.CLEANUP_CRON || '0 3 * * *'; // 03:00 AM diario
const days = Number(process.env.CLEANUP_DAYS) || 60;
// Control para desactivar si se desea
if (process.env.RUN_CRON === 'false') {
    console.log('Cleanup worker disabled by RUN_CRON=false');
    process.exit(0);
}
console.log(`Scheduling cleanup worker: schedule="${schedule}" days=${days}`);
node_cron_1.default.schedule(schedule, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date().toISOString(), 'Starting deleteOldEvidencias, days=', days);
    try {
        const res = yield (0, supabaseConfig_1.deleteOldEvidencias)(days);
        console.log(new Date().toISOString(), 'Cleanup result:', res);
    }
    catch (err) {
        console.error(new Date().toISOString(), 'Cleanup error:', err);
    }
}), {
    timezone: process.env.CLEANUP_TZ || 'UTC'
});
// Keep process alive if PM2 / node executes the file (no extra code needed)
