import express from 'express';
import { markAttendance, getAttendanceRecords, getDailySummary, getAttendanceSummary } from '../controllers/attendance.controller.js';

const router = express.Router();

router.post('/mark', markAttendance);
router.get('/records', getAttendanceRecords);
router.get('/daily-summary', getDailySummary);
router.get('/summary', getAttendanceSummary);

export default router;

