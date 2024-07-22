import { useState } from 'react';
import axios from 'axios';

const useStudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form values
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Phone:', phone);
    console.log('Address:', address);
    console.log('Grade:', grade);
    console.log('Roll Number:', rollNumber);

    try {
      await axios.post('/api/students', {
        name, age, grade, address, email, phone, rollNumber
      });
      // Reset form fields or show success message
      setName('');
      setAge('');
      setGrade('');
      setAddress('');
      setEmail('');
      setPhone('');
      setRollNumber('');
    } catch (err) {
      console.error(err);
    }
  };

  return {
    name,
    setName,
    age,
    setAge,
    grade,
    setGrade,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    rollNumber,
    setRollNumber,
    handleSubmit
  };
};

export default useStudentForm;
