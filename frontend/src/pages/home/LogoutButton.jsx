import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout'; // Adjust the import path as necessary

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='flex justify-end p-4'>
      {loading ? (
        <span className='loading loading-spinner'></span>
      ) : (
        <BiLogOut
          className='w-6 h-6 text-white cursor-pointer'
          onClick={logout}
          title='Logout'
        />
      )}
    </div>
  );
};

export default LogoutButton;
