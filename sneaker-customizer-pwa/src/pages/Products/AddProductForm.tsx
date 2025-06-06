import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useThemeContext } from '../../hooks/useTheme';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface Props {
  isEditMode?: boolean;
}

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

export const AddProductForm: React.FC<Props> = ({ isEditMode = false }) => {
  const { id } = useParams();
  const isEdit = isEditMode && id !== 'new';
  const [formData, setFormData] = useState(defaultProduct);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [effectFile, setEffectFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { theme } = useThemeContext();

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEdit && id) {
        const snap = await getDoc(doc(db, 'products', id));
        if (snap.exists()) {
          const data = snap.data();
          setFormData({
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price.toString(),
            stock: data.stock.toString(),
            effect: data.effect || '',
            image: data.image || '',
            modelUrl: data.modelUrl || '',
          });
        }
      }
    };
    fetchProduct();
  }, [isEdit, id]);

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

    if (!imageFile && !isEdit) missingFields.push('image');
    if (!modelFile && !isEdit) missingFields.push('modelUrl');

    if (missingFields.length > 0) {
      toast.error(
        `Please complete all required fields: ${missingFields.join(', ')}`
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

    let imageUrl = formData.image;
    let modelUrl = formData.modelUrl;
    let effectUrl = formData.effect || '';

    try {
      if (imageFile) {
        if (!validImageTypes.includes(imageFile.type)) {
          toast.error('Invalid image format. Only PNG, JPG, AVIF allowed.');
          setLoading(false);
          return;
        }
        const imageRef = ref(
          storage,
          `products/images/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (modelFile) {
        if (!validModelTypes.includes(modelFile.type)) {
          toast.error('Invalid model format. Only .glb allowed.');
          setLoading(false);
          return;
        }
        const modelRef = ref(
          storage,
          `products/models/${Date.now()}_${modelFile.name}`
        );
        await uploadBytes(modelRef, modelFile);
        modelUrl = await getDownloadURL(modelRef);
      }

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
        effect: effectUrl,
        updatedAt: new Date().toISOString(),
      };

      if (isEdit && id) {
        await setDoc(doc(db, 'products', id), productData);
        toast.success('✅ Product updated!');
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date().toISOString(),
        });
        toast.success('✅ Product added!');
      }

      setFormData(defaultProduct);
      setImageFile(null);
      setModelFile(null);
      setEffectFile(null);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to submit product.');
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
        {isEdit ? 'Edit Product' : 'Add New Product'}
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

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {[
              {
                label: '🖼️ Upload Image (PNG/JPG/AVIF)',
                id: 'upload-image',
                accept: 'image/png, image/jpeg, image/jpg, image/avif',
                file: imageFile,
                setFile: setImageFile,
                previewUrl: formData.image,
                border: '#80D0FF',
                type: 'image',
              },
              {
                label: '📦 Upload Model (.glb)',
                id: 'upload-model',
                accept: '.glb,model/gltf-binary',
                file: modelFile,
                setFile: setModelFile,
                previewUrl: formData.modelUrl,
                border: '#B388FF',
                type: 'model',
              },
              {
                label: '✨ Upload Effect (.deepar)',
                id: 'upload-effect',
                accept: '.deepar',
                file: effectFile,
                setFile: setEffectFile,
                previewUrl: formData.effect,
                border: '#FF80C5',
                type: 'effect',
              },
            ].map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Typography sx={{ mb: 1, color: item.border }}>
                  {item.label}
                </Typography>

                {/* Preview */}
                {isEdit && item.previewUrl && !item.file && (
                  <Box
                    sx={{
                      mb: 1,
                      p: 1,
                      border: `1px solid ${item.border}`,
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,0.03)',
                      fontSize: '0.85rem',
                      color: '#aaa',
                    }}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.previewUrl}
                        alt="preview"
                        style={{
                          width: '400px',
                          height: '400px',
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <span>
                        📁 Current file: {item.previewUrl.split('/').pop()}
                      </span>
                    )}
                  </Box>
                )}

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
                >
                  {item.file ? 'File Selected ✅' : 'Click or Drag File Here'}
                  <input
                    type="file"
                    id={item.id}
                    accept={item.accept}
                    onChange={(e) => item.setFile(e.target.files?.[0] || null)}
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
              {loading
                ? 'Uploading...'
                : isEdit
                  ? 'Update Product'
                  : 'Add Product'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
