import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useThemeContext } from '../../hooks/useTheme';
import { toast } from 'react-toastify';

const defaultProduct = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  effect: '',
  image: '',
  modelUrl: '',
};

export const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState(defaultProduct);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [effectFile, setEffectFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { theme } = useThemeContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const requiredFields = [
      'name',
      'description',
      'category',
      'price',
      'stock',
    ];
    const missingFields = requiredFields.filter(
      (key) => !(formData as any)[key]
    );

    if (!imageFile || !modelFile || missingFields.length > 0) {
      toast.error(
        `Please complete all required fields: ${[
          ...missingFields,
          !imageFile ? 'image' : '',
          !modelFile ? 'modelUrl' : '',
        ]
          .filter(Boolean)
          .join(', ')}`
      );
      setLoading(false);
      return;
    }

    const validImageTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/avif',
    ];
    const validModelTypes = ['model/gltf-binary'];
    const validEffectTypes = ['application/octet-stream', 'model/x-deepar'];

    if (!validImageTypes.includes(imageFile.type)) {
      toast.error('Invalid image format. Only PNG and JPG allowed.');
      setLoading(false);
      return;
    }

    if (!validModelTypes.includes(modelFile.type)) {
      toast.error('Invalid model format. Only .glb allowed.');
      setLoading(false);
      return;
    }

    let imageUrl = '';
    let modelUrl = '';
    let effectUrl = '';

    try {
      // Upload image
      const imageRef = ref(
        storage,
        `products/images/${Date.now()}_${imageFile.name}`
      );
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);

      // Upload model
      const modelRef = ref(
        storage,
        `products/models/${Date.now()}_${modelFile.name}`
      );
      await uploadBytes(modelRef, modelFile);
      modelUrl = await getDownloadURL(modelRef);

      // Optional effect upload
      if (effectFile) {
        if (!validEffectTypes.includes(effectFile.type)) {
          toast.error('Invalid effect format. Only .deepar allowed.');
          setLoading(false);
          return;
        }

        const effectRef = ref(
          storage,
          `products/effects/${Date.now()}_${effectFile.name}`
        );
        await uploadBytes(effectRef, effectFile);
        effectUrl = await getDownloadURL(effectRef);
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: imageUrl,
        modelUrl,
        effect: effectUrl || '',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'products'), productData);
      toast.success('✅ Product added successfully!');

      // Reset
      setFormData(defaultProduct);
      setImageFile(null);
      setModelFile(null);
      setEffectFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Paper
      sx={{
        p: 4,
        background: 'linear-gradient(145deg, #1a0933, #0d021c)',
        color: '#E0E0FF',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: '#80D0FF' }}>
        Add New Product
      </Typography>

      <Grid container spacing={2}>
        {['name', 'description', 'category', 'price', 'stock'].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              fullWidth
              required
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              sx={theme.textFieldStyles}
            />
          </Grid>
        ))}

        {/* Upload Zones */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {[
              {
                label: '🖼️ Upload Image (PNG/JPG)',
                id: 'upload-image',
                accept: 'image/png, image/jpeg, image/jpg, image/avif',
                onChange: (e: any) => setImageFile(e.target.files?.[0] || null),
                border: '#80D0FF',
              },
              {
                label: '📦 Upload Model (.glb)',
                id: 'upload-model',
                accept: '.glb,model/gltf-binary',
                onChange: (e: any) => setModelFile(e.target.files?.[0] || null),
                border: '#B388FF',
              },
              {
                label: '✨ Upload Effect (.deepar)',
                id: 'upload-effect',
                accept: '.deepar',
                onChange: (e: any) =>
                  setEffectFile(e.target.files?.[0] || null),
                border: '#FF80C5',
              },
            ].map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Typography sx={{ mb: 1, color: item.border }}>
                  {item.label}
                </Typography>
                <label
                  htmlFor={item.id}
                  style={{
                    display: 'block',
                    border: `2px dashed ${item.border}`,
                    borderRadius: '8px',
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#E0E0FF',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = '#fff')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = item.border)
                  }
                >
                  Click or Drag File Here
                  <input
                    type="file"
                    id={item.id}
                    accept={item.accept}
                    onChange={item.onChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                background: 'linear-gradient(to right, #00f5ff, #0088ff)',
                color: '#fff',
                borderRadius: '30px',
                boxShadow: '0 0 12px rgba(0,245,255,0.4)',
                '&:hover': {
                  background: 'linear-gradient(to right, #00d2ff, #0066cc)',
                  boxShadow: '0 0 20px rgba(0,245,255,0.6)',
                },
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              {loading ? 'Uploading...' : 'Add Product'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
