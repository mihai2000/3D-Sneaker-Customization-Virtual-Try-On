import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useAuth } from '../../hooks/useAuth';
import { fetchOrders } from '../../services/orders';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      const data = await fetchOrders(user);
      setOrders(data);
    };
    loadOrders();
  }, [user]);

  return (
    <Paper sx={{ p: 4 }}>
      <SectionTitle title="Your Orders" />
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Order #${order.id}`}
              secondary={`Status: ${order.status || 'Pending'} | Total: $${order.total || 0}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
