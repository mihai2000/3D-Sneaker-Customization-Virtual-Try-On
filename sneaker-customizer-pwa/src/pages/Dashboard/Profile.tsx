import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { useAuth } from '../../auth/useAuth';
import { db } from '../../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SectionTitle from '../../components/Shared/SectionTitle';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setEmail(data.email || '');
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    await setDoc(doc(db, 'users', user), { name, email }, { merge: true });
    alert('Profile updated!');
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
