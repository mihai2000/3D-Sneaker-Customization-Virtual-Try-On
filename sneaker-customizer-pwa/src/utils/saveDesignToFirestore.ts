import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import state from '../store';
import { uploadPreviewImage } from './uploadPreviewImage';
import { toast } from 'react-toastify';
import { DesignData } from '../types/designs';
export const saveDesignToFirestore = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error('User not authenticated');

  const db = getFirestore();
  const preview = await uploadPreviewImage();
  if (!preview) throw new Error('Preview upload failed');

  const designData: Omit<DesignData, 'id'> = {
    userId: user.uid,
    items: state.items,
    logoDecal: state.logoDecal,
    fullDecal: state.fullDecal,
    isLogoTexture: state.isLogoTexture,
    isFullTexture: state.isFullTexture,
    previewImageUrl: preview?.url || '',
    previewImagePath: preview?.path || '',
    createdAt: serverTimestamp(),
  };

  if (state.currentDesignId) {
    const docRef = doc(db, 'users', user.uid, 'designs', state.currentDesignId);
    await updateDoc(docRef, designData); // 🔁 Update
    toast.success('Design updated successfully!');
  } else {
    const collectionRef = collection(db, 'users', user.uid, 'designs');
    await addDoc(collectionRef, designData); // ➕ Create
    toast.success('Design created successfully!');
  }
};
