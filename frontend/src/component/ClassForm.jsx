import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreatingClass, setIsCreatingClass] = useState(true); // New state to toggle between actions

  useEffect(() => {
    // Fetch all classes
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes');
        setClasses(res.data);
      } catch (err) {
        setError('Error fetching classes');
      }
    };

    // Fetch all students
    const fetchStudents = async () => {
      try {
        const res = await axios.get('/api/students'); // Adjust the endpoint as necessary
        setAllStudents(res.data);
      } catch (err) {
        setError('Error fetching students');
      }
    };

    fetchClasses();
    fetchStudents();
  }, []);

  const handleAddStudent = (studentId) => {
    if (studentId && !selectedStudents.includes(studentId)) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setError('Student already added or invalid ID');
    }
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudents(selectedStudents.filter(student => student !== studentId));
  };

  const handleSubmitNewClass = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/classes', {
        name,
        description,
        students: selectedStudents
      });
      setSuccess('Class added successfully');
      setName('');
      setDescription('');
      setSelectedStudents([]);
      setSelectedClass('');
    } catch (err) {
      setError('Error adding class');
    }
  };

  const handleSubmitAddStudents = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (selectedStudents.length === 0 || !selectedClass) {
      setError('No students selected or no class selected');
      return;
    }
  
    try {
      await axios.patch(`/api/classes/${selectedClass}/students`, {
        students: selectedStudents
      });
      setSuccess('Students added to class successfully');
      setSelectedStudents([]);
      setSelectedClass('');
    } catch (err) {
      setError('Error adding students to class');
    }
  };
  

  const handleStudentSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      handleAddStudent(value);
    } else {
      handleRemoveStudent(value);
    }
  };

  return (
    <div>
      <h2>{isCreatingClass ? 'Add New Class' : 'Add Students to Class'}</h2>
      <form onSubmit={isCreatingClass ? handleSubmitNewClass : handleSubmitAddStudents}>
        {isCreatingClass ? (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="classSelect">Select Class:</label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select a class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {!isCreatingClass && (
          <div>
            <h4>Select Students for Class</h4>
            {allStudents.map((student) => (
              <div key={student._id}>
                <input
                  type="checkbox"
                  id={student._id}
                  value={student._id}
                  checked={selectedStudents.includes(student._id)}
                  onChange={handleStudentSelection}
                />
                <label htmlFor={student._id}>{student.name}</label> {/* Adjust based on your student model */}
              </div>
            ))}
          </div>
        )}

        <button type="submit">
          {isCreatingClass ? 'Submit New Class' : 'Submit Students'}
        </button>
      </form>
      <button onClick={() => setIsCreatingClass(!isCreatingClass)}>
        {isCreatingClass ? 'Switch to Add Students' : 'Switch to Add New Class'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default ClassForm;
