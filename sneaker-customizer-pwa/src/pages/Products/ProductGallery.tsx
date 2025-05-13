// import { useEffect, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import './ProductGallery.scss';
// import ShoeModelViewer from '../../components/canvas/ShoeModelViewer';
// import { Search, ShoppingCart } from 'lucide-react';
// import { toast } from 'react-toastify';
// import { Chip } from '@mui/material';
// import { useCart } from '../../hooks/useCart';
// import { fetchProducts } from '../../services/products';

// const categories = ['All', 'Men', 'Women', 'Unisex'];

// export default function ProductGallery({ product }: { product: any }) {
//   const { addToCart } = useCart();

//   const [products, setProducts] = useState<any[]>([]);
//   const [filtered, setFiltered] = useState<any[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedShoe, setSelectedShoe] = useState<any | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       const data = await fetchProducts();
//       setProducts(data);
//     };
//     load();
//   }, []);

//   useEffect(() => {
//     const lower = searchQuery.toLowerCase();
//     const result = products.filter(
//       (p) =>
//         p.name.toLowerCase().includes(lower) &&
//         (selectedCategory === 'All' || p.category === selectedCategory)
//     );
//     setFiltered(result);
//   }, [products, searchQuery, selectedCategory]);

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: 1,
//       image: product.image,
//     });
//     toast.success(`${product.name} added to cart!`);
//   };
//   return (
//     <div className="featured-products-container">
//       <div className="search-section">
//         <div className="search-bar-wrapper">
//           <div className="search-bar">
//             <Search className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="search-input"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="category-filters">
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               color={cat === selectedCategory ? 'primary' : 'default'}
//               onClick={() => setSelectedCategory(cat)}
//               clickable
//               sx={{ mr: 1 }}
//             />
//           ))}
//         </div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="product-grid"
//         >
//           <AnimatePresence>
//             {filtered.map((shoe) => (
//               <motion.div
//                 key={shoe.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 whileHover={{ y: -10 }}
//                 className="product-card"
//                 onClick={() => setSelectedShoe(shoe)}
//               >
//                 <div className="card-glow" />
//                 <div className="card-inner">
//                   <div className="image-container">
//                     <motion.img
//                       src={shoe.image}
//                       alt={shoe.name}
//                       className="product-image"
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.4 }}
//                     />
//                   </div>

//                   <div className="product-details">
//                     <h2 className="product-title">{shoe.name}</h2>
//                     <p className="product-description">{shoe.description}</p>
//                     <div className="product-footer">
//                       <span className="product-price">${shoe.price}</span>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={handleAddToCart}
//                         // onClick={(e) => handleAddToCartStatic(e, shoe)}
//                         className="add-to-cart-button"
//                       >
//                         <ShoppingCart className="cart-icon" />
//                         Add to Cart
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {selectedShoe && (
//         <ShoeModelViewer
//           isOpen={true}
//           onClose={() => setSelectedShoe(null)}
//           modelUrl={selectedShoe?.modelUrl ?? ''}
//           shoeName={selectedShoe?.name}
//         />
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './ProductGallery.scss';
import ShoeModelViewer from '../../components/canvas/ShoeModelViewer';
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
  }, [products, searchQuery, selectedCategory]);

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
        <AnimatePresence>
          {filtered.map((shoe) => (
            <ProductCard
              key={shoe.id}
              shoe={shoe}
              onSelect={() => setSelectedShoe(shoe)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

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
