import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'admin' | 'user';
}

export const fetchUserProfile = async (
  userId: string
): Promise<UserProfile> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists()
    ? (docSnap.data() as UserProfile)
    : { name: '', email: '' };
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
) => {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, updates);
};
