import React from 'react';
import useClass from '../../hooks/useClasses';
import ClassForm from '../../component/ClassForm';
import ClassScheduleForm from '../../component/ClassScheduleForm';
import ClassList from '../../component/ClassList';

const ClassManagement = () => {
  const {
    classes,
    classInfo,
    schedules,
    handleClassChange,
    handleScheduleChange,
    addSchedule,
    removeSchedule,
    addClass,
    addClassSchedule,
    error,
    success
  } = useClass();

  return (
    <div>
      <h1>Class Management</h1><br></br><b
      r></b><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <ClassForm
        classInfo={classInfo}
        handleClassChange={handleClassChange}
        addClass={addClass}
        error={error}
        success={success}
      />

      <ClassScheduleForm
        schedules={schedules}
        handleScheduleChange={handleScheduleChange}
        addSchedule={addSchedule}
        removeSchedule={removeSchedule}
        addClassSchedule={addClassSchedule}
      />

      <ClassList classes={classes} />
    </div>
  );
};

export default ClassManagement;
