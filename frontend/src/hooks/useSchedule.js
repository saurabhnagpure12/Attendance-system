// hooks/useSchedule.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [schedule, setSchedule] = useState({ day: '', startTime: '', endTime: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get('/api/classes/schedule');
        setSchedules(res.data);
      } catch (err) {
        setError('Error fetching schedules');
      }
    };

    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes');
        setClasses(res.data);
      } catch (err) {
        setError('Error fetching classes');
      }
    };

    fetchSchedules();
    fetchClasses();
  }, []);

  const handleScheduleChange = (field, value) => {
    setSchedule({ ...schedule, [field]: value });
  };

  const addSchedule = async () => {
    try {
      const res = await axios.post('/api/classes/schedule', { ...schedule, classId: selectedClassId });
      setSchedules([...schedules, res.data]);
      setSuccess('Schedule added successfully');
      setSchedule({ day: '', startTime: '', endTime: '' });
      setSelectedClassId('');
    } catch (err) {
      setError('Error adding schedule');
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`/api/classes/schedule/${id}`);
      setSchedules(schedules.filter(schedule => schedule._id !== id));
      setSuccess('Schedule deleted successfully');
    } catch (err) {
      setError('Error deleting schedule');
    }
  };

  return {
    schedules,
    classes,
    selectedClassId,
    setSelectedClassId,
    schedule,
    handleScheduleChange,
    addSchedule,
    deleteSchedule,
    error,
    success,
  };
};

export default useSchedule;
