import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'));
    setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('🗑️ Product deleted');
      loadProducts();
    } catch (error) {
      console.error('Failed to delete', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: '#80D0FF' }}>
          📦 Manage Products
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => setShowGrid((prev) => !prev)}
            sx={{
              color: '#80D0FF',
              borderColor: '#80D0FF',
              '&:hover': {
                borderColor: '#00f5ff',
                background: 'rgba(0,245,255,0.05)',
              },
            }}
          >
            {showGrid ? 'Hide Products' : 'Show Products'}
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard/manage-products/edit/new')}
            sx={{
              background: 'linear-gradient(to right, #00f5ff, #0088ff)',
              color: '#fff',
              boxShadow: '0 0 12px rgba(0,245,255,0.4)',
              '&:hover': {
                background: 'linear-gradient(to right, #00d2ff, #0066cc)',
              },
            }}
          >
            ➕ Create Product
          </Button>
        </Stack>
      </Box>

      {showGrid && (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <Paper
                sx={{
                  p: 2,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#E0E0FF',
                }}
              >
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() =>
                      navigate(`/dashboard/manage-products/edit/${product.id}`)
                    }
                    sx={{ color: '#80D0FF' }}
                  >
                    Edit
                  </Button>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <DeleteIcon sx={{ color: '#FF8080' }} />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
