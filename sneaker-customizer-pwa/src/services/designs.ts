import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { DesignData } from '../types/designs';

export const fetchSavedDesigns = async (user: {
  uid: string;
}): Promise<DesignData[]> => {
  const db = getFirestore();
  const designsRef = collection(db, 'users', user.uid, 'designs');
  const snapshot = await getDocs(designsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<DesignData, 'id'>),
  }));
};

export const fetchSavedDesignById = async (
  designId: string
): Promise<DesignData | null> => {
  const db = getFirestore();
  const user = getAuth().currentUser;
  if (!user) return null;

  const ref = doc(db, 'users', user.uid, 'designs', designId);
  const snap = await getDoc(ref);

  return snap.exists()
    ? {
        id: snap.id,
        ...(snap.data() as Omit<DesignData, 'id'>),
      }
    : null;
};
