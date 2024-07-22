import { useState, useEffect } from 'react';
import axios from 'axios';

const useStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState({ name: '', rollNumber: '', rfidTag: '', classId: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        setError('Error fetching students.');
      }
    };

    fetchStudents();
  }, []);

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const addStudent = async () => {
    try {
      const response = await axios.post('/api/students', studentInfo);
      setStudents((prev) => [...prev, response.data]);
      setSuccess('Student added successfully.');
      setStudentInfo({ name: '', rollNumber: '', rfidTag: '', classId: '' });
    } catch (error) {
      setError('Error adding student.');
    }
  };

  const updateStudent = async () => {
    try {
      const response = await axios.put(`/api/students/${currentStudentId}`, studentInfo);
      setStudents((prev) => prev.map((student) => (student._id === currentStudentId ? response.data : student)));
      setSuccess('Student updated successfully.');
      setCurrentStudentId(null);
      setStudentInfo({ name: '', rollNumber: '', rfidTag: '', classId: '' });
    } catch (error) {
      setError('Error updating student.');
    }
  };

  return {
    students,
    studentInfo,
    handleStudentChange,
    addStudent,
    updateStudent,
    error,
    success,
    currentStudentId,
    setCurrentStudentId
  };
};

export default useStudent;
