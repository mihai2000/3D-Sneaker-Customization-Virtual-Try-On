import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNav = ['/login', '/register', '.forgot-password'].includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
