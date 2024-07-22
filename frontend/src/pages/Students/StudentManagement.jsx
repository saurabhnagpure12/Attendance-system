import React from 'react';
import useStudent from '../../hooks/useStudent';
import StudentForm from '../../component/StudentForm';
import StudentList from '../../component/StudentList';

const StudentManagement = () => {
  const {
    students,
    studentInfo,
    handleStudentChange,
    addStudent,
    updateStudent,
    error,
    success,
    currentStudentId,
    setCurrentStudentId
  } = useStudent();

  return (
    <div>
      <h1>Student Management</h1>

      <StudentForm
        studentId={currentStudentId}
        studentInfo={studentInfo}
        handleStudentChange={handleStudentChange}
        onSubmit={currentStudentId ? updateStudent : addStudent}
        error={error}
        success={success}
        closeForm={() => setCurrentStudentId(null)}
      />

      <StudentList
        students={students}
        setCurrentStudentId={setCurrentStudentId}
      />
    </div>
  );
};

export default StudentManagement;
