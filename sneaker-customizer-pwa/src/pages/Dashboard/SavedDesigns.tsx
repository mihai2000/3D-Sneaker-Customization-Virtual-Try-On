import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { useAuth } from '../../auth/useAuth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import SectionTitle from '../../components/Shared/SectionTitle';

export default function SavedDesigns() {
  const { user } = useAuth();
  const [designs, setDesigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      if (!user) return;
      const q = query(collection(db, 'designs'), where('userId', '==', user));
      const snap = await getDocs(q);
      setDesigns(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchDesigns();
  }, [user]);

  return (
    <Paper sx={{ p: 4 }}>
      <SectionTitle title="Saved Designs" />

      <Grid container spacing={2}>
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={4} key={design.id}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              <Typography variant="subtitle1">Design: {design.name}</Typography>
              <Typography variant="body2">Style: {design.style}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
