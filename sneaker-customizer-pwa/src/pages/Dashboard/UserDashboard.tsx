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
import LogoutIcon from '@mui/icons-material/Logout';
import TextureIcon from '@mui/icons-material/Texture';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Orders from '../Orders/Orders';
import TexturesLogos from '../TexturesLogos/TexturesLogos';
import { ThemeProvider } from '../../providers/ThemeProvider';
import './DashboardPanel.scss';
import Profile from './Profile';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MenuIcon from '@mui/icons-material/Menu';
import SavedDesigns from '../SavedDesign/SavedDesigns';

type ViewKey =
  | 'dashboard'
  | 'orders'
  | 'textures-logos'
  | 'profile'
  | 'saved-designs'
  | 'logout';

const drawerWidth = 220;

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:425px)');
  const [mobileOpen, setMobileOpen] = useState(false);
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
    {
      label: 'Saved Designs',
      icon: <DesignServicesIcon />,
      view: 'saved-designs',
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
    if (isMobile) setMobileOpen(false);
  };
  const drawerContent = (
    <Box>
      <Box sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" sx={{ color: '#80D0FF' }}>
          User Panel
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => handleViewChange(item.view)}
            sx={{
              cursor: 'pointer',
              backgroundColor:
                view === item.view ? 'rgba(255,255,255,0.08)' : 'transparent',
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
    <div className="dashboard-container user">
      <Box sx={{ display: 'flex' }}>
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
                User Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              mt: isMobile ? 0 : '4rem',
              background: 'linear-gradient(to bottom, #2a2a3d, #1e1e2f)',
              color: '#E0E0FF',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Box
          sx={{
            flexGrow: 1,
            mt: isMobile ? 7 : 4,
            p: 4,
            background: '#12121A',
            minHeight: '100vh',
          }}
        >
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

          {view === 'saved-designs' && (
            <>
              <Typography variant="h4" sx={{ color: '#80D0FF', mb: 3 }}>
                Your Saved Designs
              </Typography>
              <SavedDesigns />
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
