import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className='main-auth'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
