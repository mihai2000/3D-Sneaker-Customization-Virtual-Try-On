import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TextureIcon  from '@mui/icons-material/Texture';
import { useNavigate } from 'react-router-dom';
import './DashboardPanel.scss';
import { useAuth } from '../../hooks/useAuth';
const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  {
    label: 'Textures & Logos',
    icon: <TextureIcon  />,
    path: '/textures-logos',
  },
  { label: 'Settings', icon: <SettingsIcon />, path: '/profile' },
  { label: 'Logout', icon: <LogoutIcon />, path: '/logout' },
];

const drawerWidth = 220;

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = async (item: (typeof menuItems)[0]) => {
    if (item.label === 'Logout') {
      await logout(); // call actual logout
      navigate('/login'); // redirect to login
    } else {
      navigate(item.path);
    }
  };
  return (
    <div className="dashboard-container user">
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              marginTop: '4rem',
              background: 'linear-gradient(to bottom, #2a2a3d, #1e1e2f)',
              color: '#E0E0FF',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            },
          }}
        >
          <Box sx={{ px: 2, py: 3 }}>
            <Typography variant="h6" sx={{ color: '#80D0FF' }}>
              User Panel
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => handleNavigation(item)}
                sx={{
                  cursor: 'pointer', // 👈👆 adds pointer
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#B0B3FF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box sx={{ flexGrow: 1, p: 4, background: '#12121A', mt: 4 }}>
          <Typography variant="h4" sx={{ color: '#80D0FF', mb: 3 }}>
            Welcome to Your Dashboard 🎉
          </Typography>

          {/* You can place user widgets or components here */}
          <Box
            sx={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              p: 3,
              color: '#fff',
              fontSize: '1.2rem',
            }}
          >
            Access your orders, track deliveries, update your profile, and more.
          </Box>
        </Box>
      </Box>
    </div>
  );
};
