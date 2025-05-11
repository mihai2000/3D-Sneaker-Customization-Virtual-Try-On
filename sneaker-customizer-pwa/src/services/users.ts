import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const fetchUserProfile = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { name: '', email: '' };
};

export const updateUserProfile = async (userId: string, data: { name: string; email: string }) => {
  await setDoc(doc(db, 'users', userId), data, { merge: true });
};
