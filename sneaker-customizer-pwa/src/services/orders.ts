import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

export const fetchOrders = async (userId: string) => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
