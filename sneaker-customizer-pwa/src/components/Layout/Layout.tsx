import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const appBarHeight = isMobile ? 56 : 64;
  const location = useLocation();
  const hideNav = ['/login', '/register', '/forgot-password'].includes(
    location.pathname
  );

  return (
    <>
      {!hideNav && <Navbar />}
      <div
        style={{
          position: 'relative',
          minHeight: '100dvh',
          overflow: 'hidden',
          // background: 'linear-gradient(to bottom, #0e0e11, #08090c)',
          color: '#fff',
          paddingTop: `${appBarHeight}px`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
