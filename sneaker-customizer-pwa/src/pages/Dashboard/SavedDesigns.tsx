import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';
import { fetchSavedDesigns } from '../../services/designs';
// import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import state, { ItemsType } from '../../store';
import CustomButton from '../../components/ui/CustomButton';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';

type DesignData = {
  id: string;
  items?: Record<string, string>;
  logoDecal?: string;
  fullDecal?: string;
  isLogoTexture?: boolean;
  isFullTexture?: boolean;
  createdAt?: any;
  previewImageUrl?: string;
  previewImagePath?: string; // ✅ Add this to support deletion
};

export default function SavedDesigns() {
  const { user } = useAuth();
  const [designs, setDesigns] = useState<DesignData[]>([]);
  const navigate = useNavigate();

  const db = getFirestore();

  const loadDesigns = async () => {
    if (!user) return;
    const data = await fetchSavedDesigns(user);
    setDesigns(data);
  };

  const handleLoadDesign = (design: DesignData) => {
    const knownKeys: (keyof ItemsType)[] = [
      'laces',
      'mesh',
      'caps',
      'inner',
      'sole',
      'stripes',
      'band',
      'patch',
    ];

    for (const key of knownKeys) {
      if (design.items?.[key]) {
        state.items[key] = design.items[key];
      }
    }

    state.logoDecal = design.logoDecal || '';
    state.fullDecal = design.fullDecal || '';
    state.isLogoTexture = !!design.isLogoTexture;
    state.isFullTexture = !!design.isFullTexture;
    state.intro = false;

    navigate('/customizer');
  };

  const handleDelete = async (designId: string) => {
    if (!user) return;
    const design = designs.find((d) => d.id === designId);
    if (!design) return;

    // ✅ Delete preview image from Storage if available
    if (design.previewImagePath) {
      try {
        const storage = getStorage();
        const imgRef = storageRef(storage, design.previewImagePath);
        await deleteObject(imgRef);
      } catch (err) {
        console.warn('Failed to delete preview image:', err);
      }
    }

    // Delete design document from Firestore
    const ref = doc(db, 'users', user.uid, 'designs', designId);
    await deleteDoc(ref);
    loadDesigns();
  };

  useEffect(() => {
    loadDesigns();
  }, [user]);

  return (
    <Paper sx={{ p: 4 }}>
      <SectionTitle title="Saved Designs" />
      <Grid container spacing={2}>
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={4} key={design.id}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 2,
                backgroundColor: '#f9f9f9',
                position: 'relative',
              }}
            >
              {/* 🖼️ Preview Image */}
              {design.previewImageUrl && (
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={design.previewImageUrl}
                    alt="Preview"
                    style={{
                      width: '300px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              )}

              {/* <Typography variant="subtitle1" gutterBottom>
                Design ID: {design.id}
              </Typography>

              <Typography variant="body2" gutterBottom>
                Created:{' '}
                {design.createdAt?.toDate
                  ? format(design.createdAt.toDate(), 'PPPpp')
                  : 'N/A'}
              </Typography> */}

              <Typography variant="body2" gutterBottom>
                Logo: {design.isLogoTexture ? 'Yes' : 'No'} | Full:{' '}
                {design.isFullTexture ? 'Yes' : 'No'}
              </Typography>

              <Typography variant="body2" gutterBottom>
                Colors:
              </Typography>
              <ul style={{ paddingLeft: '1rem' }}>
                {design.items &&
                  Object.entries(design.items).map(([part, color]) => (
                    <li key={part}>
                      <strong>{part}</strong>:{' '}
                      <span style={{ color }}>{color}</span>
                    </li>
                  ))}
              </ul>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'space-between',
                }}
              >
                <CustomButton
                  type="filled"
                  title="Load & Edit"
                  customStyle="text-xs"
                  handleClick={() => handleLoadDesign(design)}
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(design.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
