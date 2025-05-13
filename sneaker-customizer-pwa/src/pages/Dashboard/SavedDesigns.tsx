import { Box, Grid, Typography, Button, Fab, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';
import { fetchSavedDesigns } from '../../services/designs';
import { useNavigate } from 'react-router-dom';
import state, { ItemsType } from '../../store';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import './SavedDesigns.scss';

type DesignData = {
  id: string;
  items?: Record<string, string>;
  logoDecal?: string;
  fullDecal?: string;
  isLogoTexture?: boolean;
  isFullTexture?: boolean;
  createdAt?: any;
  previewImageUrl?: string;
  previewImagePath?: string;
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
    state.currentDesignId = design.id;

    navigate('/customizer');
  };

  const handleCreateNew = () => {
    state.currentDesignId = null;
    state.intro = true;
    navigate('/customizer');
  };

  const handleDelete = async (designId: string) => {
    if (!user) return;
    const design = designs.find((d) => d.id === designId);
    if (!design) return;

    if (design.previewImagePath) {
      try {
        const storage = getStorage();
        const imgRef = storageRef(storage, design.previewImagePath);
        await deleteObject(imgRef);
      } catch (err) {
        console.warn('Failed to delete preview image:', err);
      }
    }

    const ref = doc(db, 'users', user.uid, 'designs', designId);
    await deleteDoc(ref);
    loadDesigns();
  };

  useEffect(() => {
    loadDesigns();
  }, [user]);

  return (
    <Box
      sx={{ p: 4 }}
      // className="dark"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <SectionTitle title="Saved Designs" />
        <Tooltip title="Create New Design">
          <Fab
            color="primary"
            onClick={handleCreateNew}
            sx={{
              boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #2196f3, #1e88e5)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2, #1565c0)',
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <Grid container spacing={3} className="saved-designs">
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={4} key={design.id}>
            <Box className="design-card">
              {design.previewImageUrl && (
                <div className="preview">
                  <img src={design.previewImageUrl} alt="Preview" />
                  <div className="overlay">
                    Logo: {design.isLogoTexture ? 'Yes' : 'No'} | Full:{' '}
                    {design.isFullTexture ? 'Yes' : 'No'}
                  </div>
                </div>
              )}

              <Box p={2}>
                <Typography variant="body2" mt={1}>
                  <strong>Colors:</strong>
                </Typography>
                <ul className="colors-list">
                  {design.items &&
                    Object.entries(design.items).map(([part, color]) => (
                      <li key={part}>
                        {part}
                        <span
                          style={{
                            backgroundColor:
                              color.toLowerCase() === '#fff'
                                ? '#e0e0e0'
                                : 'transparent',
                            borderRadius: '4px',
                            color,
                          }}
                        >
                          {color}
                        </span>
                      </li>
                    ))}
                </ul>

                <Box className="card-footer">
                  <Button
                    className="load-btn"
                    startIcon={<AddIcon />}
                    onClick={() => handleLoadDesign(design)}
                  >
                    Load & Edit
                  </Button>
                  <Button
                    className="delete-btn"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(design.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
