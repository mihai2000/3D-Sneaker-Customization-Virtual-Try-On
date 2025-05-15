import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import { NavLink } from 'react-router-dom';
  
  export const drawerWidth = 240;
  
  const navItems = [
    { label: 'Orders', path: '/orders' },
    { label: 'Saved Designs', path: '/saved-designs' },
    { label: 'Profile', path: '/profile' },
  ];
  
  
  export default function Sidebar({ onClose }: { onClose?: () => void }) {
    return (
      <Box
        sx={{
          width: drawerWidth,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Dashboard</Typography>
          {onClose && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    backgroundColor: '#1976d2',
                    color: 'white',
                  },
                }}
                onClick={onClose} // auto-close when clicked
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
  