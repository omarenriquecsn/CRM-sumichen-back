import cron from 'node-cron';
import { deleteOldEvidencias } from '../config/supabaseConfig';

const schedule = process.env.CLEANUP_CRON || '0 3 * * *';
cron.schedule(schedule, async () => {
  console.log('Worker: ejecutando limpieza de evidencias...');
  const days = Number(process.env.CLEANUP_DAYS) || 60;
  const res = await deleteOldEvidencias(days);
  console.log('Worker resultado:', res);
});
console.log(`Cleanup worker corriendo. Cron: ${schedule}`);