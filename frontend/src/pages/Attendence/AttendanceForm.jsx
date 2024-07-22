import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        setError('Error fetching students');
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        setError('Error fetching classes');
      }
    };
    fetchClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/attendance/mark', {
        studentId,
        classId
      });
      setSuccess('Attendance marked successfully');
      setError('');
    } catch (error) {
      setError('Error marking attendance');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="student">Student:</label>
          <select id="student" value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="class">Class:</label>
          <select id="class" value={classId} onChange={(e) => setClassId(e.target.value)} required>
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Mark Attendance</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
    </div>
  );
};

export default AttendanceForm;
