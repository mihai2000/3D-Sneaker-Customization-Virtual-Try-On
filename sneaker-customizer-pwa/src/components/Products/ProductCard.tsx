import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import './ProductComponents.scss';
import { useNavigate } from 'react-router';

export function ProductCard({
  shoe,
  onSelect,
}: {
  shoe: any;
  onSelect: () => void;
}) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening viewer
    addToCart({
      id: shoe.id,
      name: shoe.name,
      price: shoe.price,
      quantity: 1,
      image: shoe.image,
    });
    toast.success(`${shoe.name} added to cart!`);
  };

  const handleTryInAR = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening viewer
    navigate(`/collection/shoes?product=${shoe.id}&mode=ar`);
  };

  return (
    <div
      className="product-card"
      onClick={onSelect}
      style={{ transition: 'transform 0.2s ease' }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = 'translateY(-5px)')
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div className="card-glow" />
      <div className="card-inner">
        <div className="image-container">
          <motion.img
            src={shoe.image}
            alt={shoe.name}
            className="product-image"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="price-badge">RON {shoe.price}</div>
        </div>
        <div className="product-details">
          <h2 className="product-title">{shoe.name}</h2>
          <p className="product-description">{shoe.description}</p>
          <div className="product-footer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="card-button"
            >
              <ShoppingCart className="cart-icon" />
              Add to Cart
            </motion.button>
            {shoe.effect && shoe.effect.trim().length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="card-button"
                onClick={handleTryInAR}
              >
                Try in AR
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
