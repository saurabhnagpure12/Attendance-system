import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ studentId, studentInfo, handleStudentChange, onSubmit, error, success, closeForm }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        setFormError('Error fetching classes.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();

    if (studentId) {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(`/api/students/${studentId}`);
          const student = response.data;
          handleStudentChange({ target: { name: 'name', value: student.name } });
          handleStudentChange({ target: { name: 'rollNumber', value: student.rollNumber } });
          handleStudentChange({ target: { name: 'rfidTag', value: student.rfidTag } });
          handleStudentChange({ target: { name: 'classId', value: student.classId } });
        } catch (error) {
          setFormError('Error fetching student details.');
        }
      };
      fetchStudent();
    }
  }, [studentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit();
      closeForm();
    } catch (error) {
      setFormError('Error saving student. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (formError) return <p>{formError}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={studentInfo.name}
          onChange={handleStudentChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          name="rollNumber"
          value={studentInfo.rollNumber}
          onChange={handleStudentChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rfidTag">RFID Tag:</label>
        <input
          type="text"
          id="rfidTag"
          name="rfidTag"
          value={studentInfo.rfidTag}
          onChange={handleStudentChange}
          required
        />
      </div>
      <div>
        <label htmlFor="classId">Class:</label>
        <select
          id="classId"
          name="classId"
          value={studentInfo.classId}
          onChange={handleStudentChange}
          required
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{studentId ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
