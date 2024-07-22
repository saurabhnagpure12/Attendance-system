import React from 'react';
import useClasses from '../hooks/useClasses';

const ClassList = () => {
  const { classes, deleteClass, error, success } = useClasses();

  return (
    <div>
      <h2>Class List</h2>
      {classes.length === 0 && <p>No classes available</p>}
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            <p>Name: {cls.name}</p>
            <p>Description: {cls.description}</p>
            <p>Students: {cls.students.join(', ')}</p>
            <button onClick={() => deleteClass(cls._id)}>Delete</button>
            {/* Add update button and form/modal if needed */}
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default ClassList;
