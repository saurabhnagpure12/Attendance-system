// component/ClassScheduleForm.jsx

import React from 'react';
import useSchedule from '../hooks/useSchedule';

const ClassScheduleForm = () => {
  const {
    schedules,
    classes,
    selectedClassId,
    setSelectedClassId,
    schedule,
    handleScheduleChange,
    addSchedule,
    error,
    success,
  } = useSchedule();

  const handleSubmit = (e) => {
    e.preventDefault();
    addSchedule(); // Make sure addSchedule uses the current schedule state
  };

  return (
    <div>
      <h2>Add Class Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Class:</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name} {/* Adjust based on your class model */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Day:</label>
          <input
            type="text"
            value={schedule.day}
            onChange={(e) => handleScheduleChange('day', e.target.value)}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={schedule.startTime}
            onChange={(e) => handleScheduleChange('startTime', e.target.value)}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
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

export default ClassScheduleForm;
