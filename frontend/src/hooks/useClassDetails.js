import { useState, useEffect } from 'react';
import axios from 'axios';

const useClassDetails = (classId) => {
  const [classInfo, setClassInfo] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const res = await axios.get(`/api/classes/${classId}`);
        setClassInfo(res.data);
        const scheduleRes = await axios.get(`/api/classes/schedule?classId=${classId}`);
        setSchedule(scheduleRes.data);
      } catch (err) {
        setError('Error fetching class details');
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  return { classInfo, schedule, loading, error };
};

export default useClassDetails;
