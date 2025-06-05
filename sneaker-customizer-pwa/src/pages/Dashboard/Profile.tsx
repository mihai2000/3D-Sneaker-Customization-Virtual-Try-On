import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserProfile, updateUserProfile } from '../../services/users';
import { useThemeContext } from '../../hooks/useTheme';
import { updatePassword } from 'firebase/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Profile() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

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
          sx={theme.textFieldStyles}
        />

        <Typography sx={{ fontWeight: 500, color: theme.titleColor }}>
          New Password
        </Typography>
        <TextField
          fullWidth
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={theme.textFieldStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
