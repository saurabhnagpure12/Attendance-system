import React from 'react';
import { useAttendance } from '../hooks/useAttendance';

const AttendanceRecord = () => {
  const { attendance, error } = useAttendance();

  if (error) return <p>Error loading attendance records.</p>;

  return (
    <ul>
      {attendance.map((record) => (
        <li key={record._id}>
          {record.studentId.name} ({record.studentId.rollNumber}) - {record.eventType} at {new Date(record.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default AttendanceRecord;
