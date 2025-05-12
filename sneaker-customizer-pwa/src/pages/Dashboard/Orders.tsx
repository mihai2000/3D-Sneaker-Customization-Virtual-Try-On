import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
  Box,
} from '@mui/material';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';

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

  useEffect(() => {
    const fetchOrders = async () => {
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
    <Paper sx={{ p: 4 }}>
      <SectionTitle title="Your Orders" />

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Box key={order.id} sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              🧾 Order ID: {order.id}
            </Typography>
            <Typography variant="body2">
              Total: ${order.total.toFixed(2)} | Status: {order.status}
            </Typography>
            <List dense>
              {order.items.map((item) => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      variant="square"
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.name} × ${item.quantity}`}
                    secondary={`$${item.price.toFixed(2)} each`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))
      )}
    </Paper>
  );
}
