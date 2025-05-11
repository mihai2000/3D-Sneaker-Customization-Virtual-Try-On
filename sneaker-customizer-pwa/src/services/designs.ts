import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

export const fetchSavedDesigns = async (userId: string) => {
  const q = query(collection(db, 'designs'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
