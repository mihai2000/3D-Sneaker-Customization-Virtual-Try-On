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
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(user.uid);
        setName(data.name || '');
        setEmail(data.email || '');
      } catch (err: any) {
        toast.error(` Failed to load profile: ${err.message}`);
        console.error('Failed to load user profile', err);
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      await updateUserProfile(user.uid, { name, email });

      // 🛡️ Only update password if entered
      if (newPassword) {
        if (!currentPassword) {
          toast.error(
            '❗ Please enter your current password to update your password'
          );
          return;
        }

        const credential = EmailAuthProvider.credential(
          user.email || '',
          currentPassword
        );
        await reauthenticateWithCredential(user, credential); // 🔒 Required step
        await updatePassword(user, newPassword);
      }

      toast.success('✅ Profile updated!');
      setNewPassword('');
      setCurrentPassword('');
    } catch (err: any) {
      console.error('Profile update failed', err);

      const message =
        err?.code === 'auth/weak-password'
          ? 'Password must be at least 6 characters.'
          : err?.code === 'auth/wrong-password'
            ? 'Incorrect current password.'
            : err?.code === 'auth/requires-recent-login'
              ? 'Please logout and login again to update password.'
              : err.message || 'Profile update failed.';

      toast.error(`❌ ${message}`);
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
          Current Password
        </Typography>
        <TextField
          fullWidth
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          margin="normal"
          sx={theme.textFieldStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  edge="end"
                >
                  {showCurrentPassword ? (
                    <VisibilityOff sx={{ color: '#fff' }} />
                  ) : (
                    <Visibility sx={{ color: '#fff' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography sx={{ fontWeight: 500, color: theme.titleColor }}>
          New Password
        </Typography>
        <TextField
          fullWidth
          label="New Password"
          autoComplete="new-password"
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
                  {showNewPassword ? (
                    <VisibilityOff sx={{ color: '#fff' }} />
                  ) : (
                    <Visibility sx={{ color: '#fff' }} />
                  )}
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
