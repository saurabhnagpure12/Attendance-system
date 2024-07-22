// src/pages/home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const Home = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='flex flex-col bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      {/* Navbar */}
      <nav className='bg-gray-800 p-4 flex justify-between items-center'>
        <div className='text-white'>
          <Link to="/" className='mr-4'>Home</Link>
          <Link to="/attendance" className='mr-4'>Attendance</Link>
          <Link to="/schedule" className='mr-4'>Schedule</Link>
          <Link to="/student" className='mr-4'>Students</Link>
          <Link to="/class" className='mr-4'>Classes</Link>
        </div>
        <div>
          {!loading ? (
            <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
          ) : (
            <span className='loading loading-spinner'></span>
          )}
        </div>
      </nav>

    </div>
  );
};

export default Home;
