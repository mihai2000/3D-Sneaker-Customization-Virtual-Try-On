import { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Alert,
  Snackbar,
  Fade,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/Products/ProductCard';
import { fetchProducts } from '../../services/products';
import SectionTitle from '../../components/Shared/SectionTitle';
import ProductFilters from '../../components/Products/ProductFilters';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  useEffect(() => {
    const lower = search.toLowerCase();
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) &&
        (selectedCategory === 'All' || p.category === selectedCategory)
    );
    setFiltered(result);
  }, [products, search, selectedCategory]);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
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
      <ProductFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {filtered.length === 0 ? (
        <Typography variant="body1">No products found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product, idx) => (
            <Fade in timeout={500 + idx * 100} key={product.id}>
              <Grid item xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}
    </Container>
  );
}
