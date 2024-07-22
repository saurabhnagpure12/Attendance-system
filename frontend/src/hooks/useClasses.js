import { useState, useEffect } from 'react';
import axios from 'axios';

const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const [classInfo, setClassInfo] = useState({ name: '', description: '', students: [] });
  const [schedules, setSchedules] = useState([{ day: '', startTime: '', endTime: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes');
        setClasses(res.data);
      } catch (err) {
        setError('Error fetching classes');
      }
    };

    fetchClasses();
  }, []);

  const handleClassChange = (field, value) => {
    setClassInfo({ ...classInfo, [field]: value });
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: '', startTime: '', endTime: '' }]);
  };

  const removeSchedule = (index) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const addClass = async () => {
    try {
      const res = await axios.post('/api/classes', classInfo);
      setClasses([...classes, res.data]);
      setSuccess('Class added successfully');
    } catch (err) {
      setError('Error adding class');
    }
  };

  const updateClass = async (id) => {
    try {
      const res = await axios.put(`/api/classes/${id}`, classInfo);
      setClasses(classes.map((cls) => (cls._id === id ? res.data : cls)));
      setSuccess('Class updated successfully');
    } catch (err) {
      setError('Error updating class');
    }
  };

  const deleteClass = async (id) => {
    try {
      await axios.delete(`/api/classes/${id}`);
      setClasses(classes.filter((cls) => cls._id !== id));
      setSuccess('Class deleted successfully');
    } catch (err) {
      setError('Error deleting class');
    }
  };

  const addClassSchedule = async (classId) => {
    try {
      await axios.post('/api/classes/schedule', { classId, schedules });
      setSuccess('Class schedule added successfully');
    } catch (err) {
      setError('Error adding class schedule');
    }
  };

  return {
    classes,
    classInfo,
    schedules,
    handleClassChange,
    handleScheduleChange,
    addSchedule,
    removeSchedule,
    addClass,
    updateClass,
    deleteClass,
    addClassSchedule,
    error,
    success,
  };
};

export default useClasses;
