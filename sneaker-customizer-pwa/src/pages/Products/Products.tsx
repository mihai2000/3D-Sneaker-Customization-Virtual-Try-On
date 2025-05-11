import { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from '../../components/Products/ProductCard';
import { fetchProducts } from '../../services/products';
import SectionTitle from '../../components/Shared/SectionTitle';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
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
