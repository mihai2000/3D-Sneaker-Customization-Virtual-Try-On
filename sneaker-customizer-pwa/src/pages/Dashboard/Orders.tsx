import { useEffect, useState } from 'react';
import {  List, ListItem, ListItemText, Paper } from '@mui/material';
import { useAuth } from '../../auth/useAuth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import SectionTitle from '../../components/Shared/SectionTitle';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(collection(db, 'orders'), where('userId', '==', user));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchOrders();
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
