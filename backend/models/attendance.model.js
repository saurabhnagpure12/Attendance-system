import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  timestamp: { type: Date, required: true },
  eventType: { type: String, enum: ['entry', 'exit'], required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true } // Updated reference
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
