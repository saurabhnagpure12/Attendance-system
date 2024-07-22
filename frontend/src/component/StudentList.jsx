import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        console.log(response.data); // Log data to inspect the structure
        setStudents(response.data);
      } catch (error) {
        setError('Error fetching students.');
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <p>Name: {student.name}</p>
            <p>Roll Number: {student.rollNumber}</p>
            {/* <p>RFID Tag: {student.rfidTag}</p> */}
            {/* <p>Class ID: {student.classId}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
