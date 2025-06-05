import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserProfile, updateUserProfile } from '../../services/users';
import { useThemeContext } from '../../hooks/useTheme';
import { updatePassword } from 'firebase/auth';

export default function Profile() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(user.uid);
        setName(data.name || '');
        setEmail(data.email || '');
      } catch (err) {
        console.error('Failed to load user profile', err);
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateUserProfile(user.uid, { name, email });
      if (newPassword) {
        await updatePassword(user, newPassword);
      }
      alert('Profile updated!');
    } catch (err) {
      console.error('Profile update failed', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          ...theme.paper,
          p: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: 4,
        }}
      >
        <SectionTitle title="Your Profile" />

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={theme.textFieldStyles}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          disabled
          sx={theme.textFieldStyles}
        />

        <Typography sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
          Change Password
        </Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={theme.textFieldStyles}
        />

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            sx={theme.buttonStyle}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
