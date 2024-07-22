import React, { useState } from 'react';
import axios from 'axios';

const AttendanceSummary = () => {
  const [studentId, setStudentId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/attendance/summary', {
        params: { studentId, startDate, endDate }
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching attendance summary:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <button type="submit">Get Summary</button>
      </form>
      {summary && (
        <div>
          <p>Present Days: {summary.presentDays}</p>
          <p>Absent Days: {summary.absentDays}</p>
          <p>Tardy Days: {summary.tardyDays}</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceSummary;
