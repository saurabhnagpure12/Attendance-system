import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('/api/students');
        setStudents(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchStudents();
  }, []);

  return { students, error };
};

export default useFetchStudents;
