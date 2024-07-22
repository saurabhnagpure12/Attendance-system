import React from 'react';
import useSchedule from '../../hooks/useSchedule';
import ScheduleForm from '../../component/ScheduleForm';
import ScheduleList from '../../component/ScheduleList';

const ScheduleManagement = () => {
  const {
    schedules,
    scheduleInfo,
    handleScheduleChange,
    addSchedule,
    error,
    success
  } = useSchedule();

  return (
    <div>
      <h1>Schedule Management</h1>

      <ScheduleForm
        scheduleInfo={scheduleInfo}
        handleScheduleChange={handleScheduleChange}
        addSchedule={addSchedule}
        error={error}
        success={success}
      />

      <ScheduleList schedules={schedules} />
    </div>
  );
};

export default ScheduleManagement;
