import { useEffect, useState } from 'react';
import { Grid, Container, Typography, Alert, Snackbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/Products/ProductCard';
import { fetchProducts } from '../../services/products';
import SectionTitle from '../../components/Shared/SectionTitle';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  // Show alert and remove query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('redirect_status') === 'succeeded') {
      setShowSuccess(true);

      // Remove query string after delay
      const timer = setTimeout(() => {
      navigate(location.pathname, { replace: true });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <Container sx={{ mt: 4 }}>
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Payment successful! Thank you for your purchase.
        </Alert>
      </Snackbar>

      <SectionTitle title="Shop Shoes" />

      {products.length === 0 ? (
        <Typography variant="body1">No products found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
