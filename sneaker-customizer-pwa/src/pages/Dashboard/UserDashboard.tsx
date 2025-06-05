import React, { useState } from 'react';
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
import TextureIcon from '@mui/icons-material/Texture';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Orders from '../Orders/Orders';
import TexturesLogos from '../TexturesLogos/TexturesLogos';
import { ThemeProvider } from '../../providers/ThemeProvider';
import './DashboardPanel.scss';
import Profile from './Profile';

type ViewKey = 'dashboard' | 'orders' | 'textures-logos' | 'profile';

const drawerWidth = 220;

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [view, setView] = useState<ViewKey>('dashboard');

  const menuItems: {
    label: string;
    icon: React.ReactNode;
    view: ViewKey | 'logout';
  }[] = [
    { label: 'Dashboard', icon: <DashboardIcon />, view: 'dashboard' },
    { label: 'Orders', icon: <ShoppingCartIcon />, view: 'orders' },
    {
      label: 'Textures & Logos',
      icon: <TextureIcon />,
      view: 'textures-logos',
    },
    { label: 'Settings', icon: <SettingsIcon />, view: 'profile' },
    { label: 'Logout', icon: <LogoutIcon />, view: 'logout' },
  ];

  const handleViewChange = async (
    viewKey: (typeof menuItems)[number]['view']
  ) => {
    if (viewKey === 'logout') {
      await logout();
      navigate('/login');
    } else {
      setView(viewKey);
      navigate(`/dashboard/${viewKey}`);
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
              marginTop: '4rem',
              width: drawerWidth,
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
                onClick={() => handleViewChange(item.view)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    view === item.view
                      ? 'rgba(255,255,255,0.08)'
                      : 'transparent',
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

        <Box sx={{ flexGrow: 1, p: 4, mt: 4, background: '#12121A' }}>
          {view === 'dashboard' && (
            <>
              <Typography variant="h4" sx={{ color: '#80D0FF', mb: 3 }}>
                Welcome to Your Dashboard 🎉
              </Typography>
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
                Access your orders, track deliveries, update your profile, and
                more.
              </Box>
            </>
          )}

          {view === 'orders' && (
            <>
              <Typography variant="h4" sx={{ color: '#80D0FF', mb: 3 }}>
                Your Orders
              </Typography>
              <Orders />
            </>
          )}

          {view === 'textures-logos' && (
            <>
              <Typography variant="h4" sx={{ color: '#80D0FF', mb: 3 }}>
                Your Textures and Logos
              </Typography>
              <TexturesLogos />
            </>
          )}

          {view === 'profile' && (
            <>
              <Typography variant="h4" sx={{ color: '#80D0FF', mb: 3 }}>
                Your Profile Settings
              </Typography>
              <ThemeProvider>
                <Profile />
              </ThemeProvider>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};
