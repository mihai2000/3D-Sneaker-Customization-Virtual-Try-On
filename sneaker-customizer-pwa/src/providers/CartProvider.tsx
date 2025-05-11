import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { CartContext, CartContextProps } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // 🔄 Load cart from Firestore (Option A: subcollection per user)
  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;
      const snap = await getDocs(collection(db, 'cart', user, 'items'));
      const items = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CartItem[];
      setCart(items);
    };
    loadCart();
  }, [user]);

  // ➕ Add to cart
  const addToCart = async (item: CartItem) => {
    if (!user) return;
    const existing = cart.find((i) => i.id === item.id);
    const updatedItem = existing
      ? { ...existing, quantity: existing.quantity + item.quantity }
      : item;

    await setDoc(doc(db, 'cart', user, 'items', item.id), updatedItem);
    const updatedCart = existing
      ? cart.map((i) => (i.id === item.id ? updatedItem : i))
      : [...cart, updatedItem];

    setCart(updatedCart);
  };

  // ❌ Remove from cart
  const removeFromCart = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, 'cart', user, 'items', id));
    setCart(cart.filter((item) => item.id !== id));
  };

  // 🔁 Update quantity
  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;
    await updateDoc(doc(db, 'cart', user, 'items', id), { quantity });
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // 🧹 Clear all cart items
  const clearCart = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, 'cart', user, 'items'));
    for (const docSnap of snap.docs) {
      await deleteDoc(docSnap.ref);
    }
    setCart([]);
  };

  const value: CartContextProps = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
