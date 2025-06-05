import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

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
export const getAllUsers = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'user'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteUserById = async (uid: string) => {
  await deleteDoc(doc(db, 'users', uid));
};

export const createAppUser = async (
  email: string,
  password: string,
  name: string
) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const newUser = {
    email,
    name,
    role: 'user',
    avatarUrl: '',
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, 'users', user.uid), newUser);
};
