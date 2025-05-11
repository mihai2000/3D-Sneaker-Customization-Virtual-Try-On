import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { useCart } from '../../hooks/useCart';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">${product.price}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.image,
            })
          }
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
