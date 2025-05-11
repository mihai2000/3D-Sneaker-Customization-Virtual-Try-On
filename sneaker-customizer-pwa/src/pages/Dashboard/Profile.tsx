import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { useAuth } from '../../auth/useAuth';
import SectionTitle from '../../components/Shared/SectionTitle';
import { fetchUserProfile, updateUserProfile } from '../../services/users';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(user);
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
      await updateUserProfile(user, { name, email });
      alert('Profile updated!');
    } catch (err) {
      console.error('Profile update failed', err);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <SectionTitle title="Your Profile" />
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        disabled
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
}
