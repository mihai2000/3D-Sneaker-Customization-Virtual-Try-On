import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import TextureIcon from '@mui/icons-material/Texture';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import './DashboardPanel.scss';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 250;

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:426px)');
  const theme = useTheme();

  const menuItems = [
    {
      label: 'Admin Control Panel',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    { label: 'Orders', icon: <ShoppingCartIcon />, path: '/dashboard/orders' },
    {
      label: 'Textures & Logos',
      icon: <TextureIcon />,
      path: '/dashboard/textures-logos',
    },
    {
      label: 'Manage Products',
      icon: <CategorySharpIcon />,
      path: '/dashboard/manage-products',
    },
    {
      label: 'Saved Designs',
      icon: <ShoppingCartIcon />,
      path: 'saved-designs',
    },
    { label: 'Settings', icon: <SettingsIcon />, path: '/dashboard/profile' },
    { label: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  const handleNavigate = async (path: string) => {
    if (path === '/logout') {
      await logout();
      navigate('/login');
    } else {
      navigate(path);
    }
    if (isMobile) setMobileOpen(false);
  };
  const drawerContent = (
    <Box>
      <Box sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" sx={{ color: '#80D0FF' }}>
          Admin Panel
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => handleNavigate(item.path)}
            sx={{
              backgroundColor:
                location.pathname === item.path
                  ? 'rgba(255,255,255,0.08)'
                  : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#B0B3FF' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="dashboard-container admin">
      <Box sx={{ display: 'flex' }}>
        {/* AppBar only on mobile */}
        {isMobile && (
          <AppBar
            position="fixed"
            sx={{ zIndex: theme.zIndex.drawer + 1, background: '#1e1e2f' }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            width: isMobile ? 'auto' : drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              mt: isMobile ? '0' : '4rem',
              background: 'linear-gradient(to bottom, #2a2a3d, #1e1e2f)',
              color: '#E0E0FF',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            },
          }}
          ModalProps={{ keepMounted: true }} // Better mobile performance
        >
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: isMobile ? 7 : 4,
            p: 3,
            background: 'rgba(255, 255, 255, 0.04)',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};
