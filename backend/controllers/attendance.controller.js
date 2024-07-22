import Attendance from '../models/attendance.model.js';
import Student from '../models/student.model.js';
import Class from '../models/class.model.js';
import ClassSchedule from '../models/classSchedule.model.js';
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper function to check if current time is within the time range with buffer
const isWithinTimeRange = (currentTime, startTime, endTime) => {
  const bufferMinutes = 20;
  const dummyDate = '1970-01-01';
  const start = new Date(`${dummyDate}T${startTime}:00Z`);
  const end = new Date(`${dummyDate}T${endTime}:00Z`);
  const current = new Date(`${dummyDate}T${formatTime(currentTime)}:00Z`);

  const startBuffer = new Date(start.getTime() - bufferMinutes * 60000);
  const endBuffer = new Date(end.getTime() + bufferMinutes * 60000);

  return true;
};

export const markAttendance = async (req, res) => {
  const { studentId, classId } = req.body;
  const timestamp = new Date();

  try {

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
   
    // Check if the student is part of the class
    const classInfo = await Class.findById(classId);
    if (!classInfo || !classInfo.students.includes(student._id)) {
      return res.status(400).json({ message: 'Student not enrolled in the specified class' });
    }

    // Determine the day of the week for the current timestamp
    const dayOfWeek ="Monday";
    const classSchedule = await ClassSchedule.findOne({ classId, day: dayOfWeek });
    if (!classSchedule) return res.status(404).json({ message: 'Class schedule not found' });

    const { startTime, endTime } = classSchedule;
  
    // Check if current time is within the schedule range
    if (!isWithinTimeRange(timestamp, startTime, endTime)) {
      return res.status(400).json({ message: 'Current time is out of allowed range' });
    }
 
    // Find the last attendance record
    const lastEntry = await Attendance.findOne({ studentId: student._id, eventType: 'entry', classId }).sort({ timestamp: -1 });
    const lastExit = await Attendance.findOne({ studentId: student._id, eventType: 'exit', classId }).sort({ timestamp: -1 });

    // Determine whether to mark entry or exit
    if (!lastEntry || (lastEntry.timestamp < lastExit?.timestamp)) {
      // Create entry if no entry exists or if last entry is before last exit
      const attendance = new Attendance({
        studentId: student._id,
        timestamp,
        eventType: 'entry',
        classId
      });
      await attendance.save();
      return res.status(201).json(attendance);
    } else if (lastEntry && !lastExit) {
      // Create exit if entry exists but no exit
      const attendance = new Attendance({
        studentId: student._id,
        timestamp,
        eventType: 'exit',
        classId
      });
      await attendance.save();
      return res.status(201).json(attendance);
    } else {
      return res.status(400).json({ message: 'Cannot mark entry or exit at this time' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAttendanceRecords = async (req, res) => {
  const { studentId, date, classId } = req.query;

  try {
    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (classId) filter.classId = classId;
    if (date) {
      filter.timestamp = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      };
    }

    const records = await Attendance.find(filter)
      .populate('studentId', 'name rollNumber')
      .populate('classId', 'name')
      .sort({ timestamp: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailySummary = async (req, res) => {
  const { date } = req.query;
  const startOfDay = new Date(date).setHours(0, 0, 0, 0);
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);

  try {
    const records = await Attendance.find({
      timestamp: { $gte: startOfDay, $lt: endOfDay }
    }).populate('studentId', 'name rollNumber');

    const summary = {};

    records.forEach(record => {
      if (!summary[record.studentId.rollNumber]) {
        summary[record.studentId.rollNumber] = {
          studentId: record.studentId._id,
          name: record.studentId.name,
          rollNumber: record.studentId.rollNumber,
          entry: null,
          exit: null
        };
      }

      if (record.eventType === 'entry') {
        summary[record.studentId.rollNumber].entry = record.timestamp;
      } else if (record.eventType === 'exit') {
        summary[record.studentId.rollNumber].exit = record.timestamp;
      }
    });

    res.status(200).json(Object.values(summary));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttendanceSummary = async (req, res) => {
  const { studentId, startDate, endDate } = req.query;

  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  try {
    const records = await Attendance.find({
      studentId,
      timestamp: { $gte: start, $lt: end }
    }).sort({ timestamp: 1 });

    let presentDays = 0;
    let absentDays = 0;
    let tardyDays = 0;
    const days = {};

    records.forEach(record => {
      const date = record.timestamp.toISOString().split('T')[0];
      if (!days[date]) {
        days[date] = { entry: null, exit: null };
      }

      if (record.eventType === 'entry') {
        days[date].entry = record.timestamp;
      } else if (record.eventType === 'exit') {
        days[date].exit = record.timestamp;
      }
    });

    Object.keys(days).forEach(date => {
      if (days[date].entry && days[date].exit) {
        presentDays += 1;
      } else {
        absentDays += 1;
      }
    });

    res.status(200).json({ presentDays, absentDays, tardyDays });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { markAttendance, getAttendanceRecords, getDailySummary, getAttendanceSummary };
