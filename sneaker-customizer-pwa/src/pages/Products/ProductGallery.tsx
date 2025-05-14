import { useEffect, useState } from 'react';
import {
  motion,
} from 'framer-motion';
import { Box, Pagination } from '@mui/material';
import './ProductGallery.scss';
import ShoeModelViewer from '../../components/canvas/ShoeModelViewer/ShoeModelViewer';
import { fetchProducts } from '../../services/products';
import { ProductFilter } from '../../components/Products/ProductFilters';
import { ProductCard } from '../../components/Products/ProductCard';

const categories = ['All', 'Men', 'Women', 'Unisex'];

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShoe, setSelectedShoe] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  useEffect(() => {
    const lower = searchQuery.toLowerCase();
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) &&
        (selectedCategory === 'All' || p.category === selectedCategory)
    );
    setFiltered(result);
    setCurrentPage(1); // reset to first page when filters change
  }, [products, searchQuery, selectedCategory]);

  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="featured-products-container">
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="product-grid"
      >
        {paginatedProducts.map((shoe) => (
          <ProductCard
            key={shoe.id}
            shoe={shoe}
            onSelect={() => setSelectedShoe(shoe)}
          />
        ))}
      </motion.div>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
            size="large"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#fff',
                borderColor: '#374151',
                backgroundColor: '#1f2937',
              },
              '& .Mui-selected': {
                backgroundColor: '#3b82f6 !important',
                color: '#fff',
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: '#2d3748',
              },
            }}
          />
        </Box>
      )}

      {selectedShoe && (
        <ShoeModelViewer
          isOpen={true}
          onClose={() => setSelectedShoe(null)}
          modelUrl={selectedShoe?.modelUrl ?? ''}
          shoeName={selectedShoe?.name}
        />
      )}
    </div>
  );
}
