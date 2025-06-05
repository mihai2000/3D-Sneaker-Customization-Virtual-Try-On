import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import StorageIcon from '@mui/icons-material/Storage';

const features = [
  { label: 'Manage Users', icon: <GroupsIcon fontSize="large" color="info" /> },
  {
    label: 'System Config',
    icon: <SettingsIcon fontSize="large" color="secondary" />,
  },
  {
    label: 'Theme Control',
    icon: <PaletteIcon fontSize="large" color="secondary" />,
  },
  {
    label: 'Database Stats',
    icon: <StorageIcon fontSize="large" color="info" />,
  },
];

export const AdminControlPanel: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 4,
        minHeight: 'calc(50vh - 64px)',
        background: 'linear-gradient(135deg, #1e1e2f, #2a2a3d)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: '#80D0FF' }}>
        Admin Control Panel
      </Typography>

      <Grid container spacing={2}>
        {features.map((feat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#E0E0FF',
                backdropFilter: 'blur(6px)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 0 20px rgba(128, 208, 255, 0.3)',
                },
              }}
            >
              {feat.icon}
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {feat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
