import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import './Layout.scss';
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
        className="layout-glow-bg"
        style={{
          position: 'relative',
          minHeight: '100dvh',
          overflow: 'hidden',
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
