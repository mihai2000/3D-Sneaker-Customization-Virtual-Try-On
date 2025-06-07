import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from './firebase';
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
import { initializeApp } from 'firebase/app';

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
  name: string,
  role: 'admin' | 'user' = 'user' 
) => {
  // ✅ Create a temporary Firebase app instance (no export needed)
  const tempApp = initializeApp(
    {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    },
    'SecondaryApp' // Unique name for the secondary app
  );

  const tempAuth = getAuth(tempApp);

  const { user } = await createUserWithEmailAndPassword(
    tempAuth,
    email,
    password
  );

  const newUser = {
    email,
    name,
    role,
    avatarUrl: '',
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, 'users', user.uid), newUser);

  // 🧹 Optional: Clean up the temp app
  ((await tempApp) as any).delete?.();
};
