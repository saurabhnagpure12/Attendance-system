import mongoose from 'mongoose';

const classScheduleSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

const ClassSchedule = mongoose.model('ClassSchedule', classScheduleSchema);

export default ClassSchedule;
