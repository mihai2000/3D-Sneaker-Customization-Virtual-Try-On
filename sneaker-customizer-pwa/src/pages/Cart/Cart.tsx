import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Avatar,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router';
import CartSkeleton from '../../components/Cart/CartSkeleton';
import EmptyCart from '../../components/Cart/EmptyCart';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClearCart = () => {
    clearCart();
    toast.info('Cart has been cleared.');
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.warn(`${name} removed from cart.`);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CartSkeleton />
        </motion.div>
      ) : cart.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <EmptyCart />
        </motion.div>
      ) : (
        <motion.div
          key="cart"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {/* violet plasma */}
          <Paper
            sx={{
              p: 4,
              maxWidth: 1000,
              mx: 'auto',
              mt: 6,
              borderRadius: 4,
              color: '#fff',
              position: 'relative',
              background: '#140c1c',
              overflow: 'hidden',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(175, 120, 255, 0.12)',
              boxShadow: `
      0 0 10px rgba(150, 70, 255, 0.4),
      0 0 40px rgba(120, 60, 220, 0.3),
      0 0 80px rgba(100, 50, 200, 0.2)
    `,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background:
                  'radial-gradient(circle, rgba(200,150,255,0.15) 0%, transparent 70%)',
                animation: 'plasma 6s linear infinite',
                zIndex: 0,
              },
              '& > *': {
                position: 'relative',
                zIndex: 1,
              },
              '@keyframes plasma': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          >
          {/* <Paper
            sx={{
              p: 4,
              maxWidth: 1000,
              mx: 'auto',
              mt: 6,
              borderRadius: 4,
              color: '#fff',
              position: 'relative',
              background: '#0b0f1a',
              overflow: 'hidden',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(100, 180, 255, 0.15)',
              boxShadow: `
      0 0 12px rgba(100,180,255,0.3),
      0 0 36px rgba(80,160,255,0.2),
      0 0 72px rgba(60,140,255,0.15)
    `,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background:
                  'radial-gradient(circle, rgba(100,180,255,0.2) 0%, transparent 70%)',
                animation: 'plasmaSpin 6s linear infinite',
                zIndex: 0,
              },
              '& > *': {
                position: 'relative',
                zIndex: 1,
              },
              '@keyframes plasmaSpin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          > */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 600, color: '#fff' }}
            >
              Your Shopping Cart
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 4,
                mt: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Stack spacing={1}>
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            background:
                              'linear-gradient(to right, #0f0f0f, #1a1a1d)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 0 8px rgba(0,229,255,0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow:
                                '0 0 12px rgba(0,229,255,0.3), 0 0 20px rgba(0,229,255,0.2)',
                              transform: 'scale(1.01)',
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <Avatar
                              src={item.image}
                              alt={item.name}
                              variant="rounded"
                              sx={{ width: 64, height: 64, borderRadius: 2 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                color="#fff"
                              >
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="#aaa">
                                ${item.price.toFixed(2)} each
                              </Typography>
                            </Box>
                            <Stack direction="row" alignItems="center">
                              <IconButton
                                size="small"
                                sx={{
                                  color: '#fff',
                                  border: '1px solid rgba(255,255,255,0.15)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                  },
                                  mx: 0.5,
                                }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography sx={{ mx: 1, color: '#fff' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                sx={{
                                  color: '#fff',
                                  border: '1px solid rgba(255,255,255,0.15)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                  },
                                  mx: 0.5,
                                }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </Stack>
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleRemoveItem(item.id, item.name)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Stack>
              </Box>

              <Box
                sx={{
                  width: 300,
                  flexShrink: 0,
                  p: 3,
                  background: 'rgba(18, 18, 22, 0.95)',
                  color: '#fff',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow:
                    '0 0 15px rgba(0, 255, 255, 0.2), 0 0 40px rgba(0, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  height: 'fit-content',
                  position: 'relative',
                  top: 8,
                  transition: 'all 0.4s ease',
                  // '&:hover': {
                  //   boxShadow:
                  //     '0 0 25px rgba(0, 255, 255, 0.4), 0 0 50px rgba(0, 255, 255, 0.2)',
                  // },
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Cart Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: '#fff', mt: 1, mb: 2 }}
                >
                  Total: ${total.toFixed(2)}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: '#9c27b0',
                      borderColor: 'rgba(255,255,255,0.2)',
                      boxShadow: '0 0 8px rgba(156, 39, 176, 0.3)',
                      '&:hover': {
                        borderColor: '#fff',
                        backgroundColor: 'rgba(156, 39, 176, 0.1)',
                        boxShadow: '0 0 16px rgba(156, 39, 176, 0.6)',
                      },
                    }}
                    onClick={handleClearCart}
                    startIcon={<ClearAllIcon />}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(to right, #00e5ff, #1e88e5)',
                      color: '#fff',
                      fontWeight: 600,
                      boxShadow: '0 0 12px rgba(0,229,255,0.5)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background:
                          'linear-gradient(to right, #00bcd4, #1565c0)',
                        boxShadow: '0 0 20px rgba(0,229,255,0.8)',
                      },
                    }}
                    onClick={() => navigate('/checkout')}
                    startIcon={<ShoppingCartCheckoutIcon />}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
