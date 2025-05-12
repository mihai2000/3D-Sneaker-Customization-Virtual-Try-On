import { Box, Button, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserProfile, updateUserProfile } from '../../services/users';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
