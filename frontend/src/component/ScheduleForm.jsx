import React from 'react';
import useSchedule from '../hooks/useSchedule';

const ScheduleForm = () => {
  const {
    schedule,
    handleScheduleChange,
    addSchedule,
    error,
    success,
  } = useSchedule();

  const handleSubmit = (e) => {
    e.preventDefault();
    addSchedule();
  };

  return (
    <div>
      <h2>Add Class Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="classId">Class ID:</label>
          <input
            type="text"
            id="classId"
            value={schedule.classId}
            onChange={(e) => handleScheduleChange('classId', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="day">Day:</label>
          <input
            type="text"
            id="day"
            value={schedule.day}
            onChange={(e) => handleScheduleChange('day', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={schedule.startTime}
            onChange={(e) => handleScheduleChange('startTime', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={schedule.endTime}
            onChange={(e) => handleScheduleChange('endTime', e.target.value)}
          />
        </div>
        <button type="submit">Add Schedule</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default ScheduleForm;
