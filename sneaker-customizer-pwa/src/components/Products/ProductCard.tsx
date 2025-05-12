import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.02)' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            p: 2,
          }}
        />
        <Chip
          label={`${product.price} RON`}
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontWeight: 'bold',
            backgroundColor: '#111',
            color: '#fff',
          }}
        />
      </Box>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          {product.name}
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{ mt: 1, borderRadius: 2, fontWeight: 'bold' }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
