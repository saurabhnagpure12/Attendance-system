import { useState } from 'react';
import axios from 'axios';

const useAddClass = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/classes', { name, subject, teacher });
      setSuccess('Class added successfully!');
      setName('');
      setSubject('');
      setTeacher('');
    } catch (err) {
      setError('Error adding class. Please try again.');
    }
  };

  return {
    name,
    setName,
    subject,
    setSubject,
    teacher,
    setTeacher,
    handleSubmit,
    error,
    success,
  };
};

export default useAddClass;
