import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import StorageIcon from '@mui/icons-material/Storage';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import { ViewKey } from './AdminDashboard';

type Props = {
  onViewChange: (view: ViewKey) => void;
};

const features: {
  label: string;
  icon: React.ReactNode;
  view: ViewKey | null;
}[] = [
  {
    label: 'Manage Users',
    icon: <GroupsIcon fontSize="large" color="info" />,
    view: 'manage-users',
  },
  {
    label: 'System Config',
    icon: <SettingsIcon fontSize="large" color="secondary" />,
    view: null,
  },
  {
    label: 'Products',
    icon: <CategorySharpIcon fontSize="large" color="secondary" />,
    view: 'products',
  },
  {
    label: 'Theme Control',
    icon: <PaletteIcon fontSize="large" color="secondary" />,
    view: null,
  },
  {
    label: 'Database Stats',
    icon: <StorageIcon fontSize="large" color="info" />,
    view: null,
  },
];

export const AdminControlPanel: React.FC<Props> = ({ onViewChange }) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 4,
        minHeight: 'calc(10vh - 64px)',
        background: 'linear-gradient(145deg, #1a0933, #0d021c)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Grid container spacing={2}>
        {features.map((feat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              onClick={() => feat.view && onViewChange(feat.view)}
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
