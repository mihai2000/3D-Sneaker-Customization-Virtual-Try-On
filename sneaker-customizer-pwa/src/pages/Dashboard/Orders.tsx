import { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import emptyOrdersImg from '../../assets/empty-orders.jpg';
import { useNavigate } from 'react-router';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt?: any;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  // Inject animations into <head>
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
						@keyframes gradientMove {
							0% { background-position: 0% 50%; }
							50% { background-position: 100% 50%; }
							100% { background-position: 0% 50%; }
						}
			
						@keyframes pulseGlow {
							0% { text-shadow: 0 0 6px rgba(58, 94, 255, 0.5); }
							50% { text-shadow: 0 0 12px rgba(58, 94, 255, 0.9); }
							100% { text-shadow: 0 0 6px rgba(58, 94, 255, 0.5); }
						}
					`;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      // mock data test
      // if (user) {
      // 	// Show static mock data for testing
      // 	setOrders([
      // 		{
      // 			id: "test-order-123",
      // 			total: 149.97,
      // 			status: "succeeded",
      // 			createdAt: { seconds: Date.now() / 1000 },
      // 			items: [
      // 				{
      // 					id: "shoe-001",
      // 					name: "Nike Air Max 270",
      // 					price: 49.99,
      // 					quantity: 3,
      // 					image:
      // 						"https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.firebasestorage.app/o/Puma_RS-X.avif?alt=media&token=195a87b3-cfa7-49e9-b7ba-b83cb09210db",
      // 				},
      // 			],
      // 		},
      // 	]);
      // 	return;
      // }
      if (!user) return;

      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid)
      );
      const snap = await getDocs(q);
      const results: Order[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, 'id'>),
      }));
      results.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setOrders(results);
    };

    fetchOrders();
  }, [user]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(-45deg, #0e0e11, #1a1c26, #14161c, #0a0b10)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 20s ease infinite',
        p: 4,
      }}
    >
      <Box
        sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 4,
          p: 4,
          maxWidth: 900,
          mx: 'auto',
          boxShadow: '0 0 32px rgba(120, 98, 255, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            animation: 'pulseGlow 3s infinite',
          }}
        >
          Your Orders
        </Typography>

        {orders.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <img
              src={emptyOrdersImg}
              alt="No Orders"
              style={{
                width: '220px',
                maxWidth: '100%',
                borderRadius: 12,
                boxShadow: '0 0 18px rgba(120, 98, 255, 0.25)',
              }}
            />
            <Typography variant="h6" fontWeight={600} sx={{ color: 'white' }}>
              No Orders Yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              You haven’t placed any orders. When you do, they’ll appear here.
            </Typography>
            <Button
              sx={{
                mt: 2,
                px: 3,
                py: 1.2,
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(90deg, #8e24aa, #5e35b1)',
                borderRadius: 2,
                boxShadow: '0 0 16px rgba(142, 36, 170, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #7b1fa2, #512da8)',
                  boxShadow: '0 0 20px rgba(142, 36, 170, 0.5)',
                },
              }}
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Stack spacing={3}>
            {orders.map((order) => (
              <Card
                key={order.id}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 3,
                  background: 'linear-gradient(120deg, #1a1b25, #1f1a2f)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 24px rgba(142, 36, 170, 0.2)',
                  color: '#f0f0f0',
                  backdropFilter: 'blur(6px)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-75%',
                    width: '50%',
                    height: '100%',
                    background:
                      'linear-gradient(120deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    transform: 'skewX(-20deg)',
                    transition: 'left 0.6s ease-in-out',
                  },
                  '&:hover::after': {
                    left: '130%',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <ReceiptLongIcon sx={{ color: '#ba68c8' }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Order ID: {order.id}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#aaa',
                      mb: 2,
                      '& strong': {
                        color: '#ba68c8',
                        animation: 'pulseGlow 3s infinite',
                        fontWeight: 600,
                      },
                    }}
                  >
                    Total: <strong>RON{order.total.toFixed(2)}</strong> | Status:{' '}
                    {order.status}
                  </Typography>
                  <List dense>
                    {order.items.map((item) => (
                      <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="rounded"
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: 2,
                              border: '1px solid #444',
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${item.name} × ${item.quantity}`}
                          secondary={`RON ${item.price.toFixed(2)} each`}
                          primaryTypographyProps={{
                            color: 'white',
                            fontWeight: 500,
                          }}
                          secondaryTypographyProps={{
                            color: '#888',
                          }}
                          sx={{ ml: 2 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
