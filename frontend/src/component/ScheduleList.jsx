import React from 'react';
import useSchedule from '../hooks/useSchedule';

const ScheduleList = ({ classId }) => {
  const { schedules, deleteSchedule, error, success } = useSchedule(classId);

  return (
    <div>
      <h2>Class Schedules</h2>
      {schedules.length === 0 && <p>No schedules available</p>}
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule._id}>
            <p>Day: {schedule.day}</p>
            <p>Start Time: {schedule.startTime}</p>
            <p>End Time: {schedule.endTime}</p>
            <button onClick={() => deleteSchedule(schedule._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default ScheduleList;
