import { useState, useEffect } from 'react';
import axios from 'axios';

const useScanRfid = () => {
  const [rfid, setRfid] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        setUsers(res.data);
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleScan = (e) => {
    setRfid(e.target.value);
  };

  const handleMarkAttendance = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/attendance/mark', {
        studentId: rfid,
        timestamp: new Date().toISOString(),
        userId: selectedUser,
      });
      setSuccess('Attendance marked successfully!');
      setRfid('');
      setSelectedUser('');
    } catch (err) {
      setError('Error marking attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    rfid,
    setRfid,
    users,
    selectedUser,
    setSelectedUser,
    handleScan,
    handleMarkAttendance,
    loading,
    error,
    success,
  };
};

export default useScanRfid;
