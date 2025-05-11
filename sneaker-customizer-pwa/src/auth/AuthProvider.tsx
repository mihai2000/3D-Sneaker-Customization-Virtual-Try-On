import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth, db } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setToken(null);
      toast.success('Logged out successfully!');
    } catch (err: any) {
      toast.error('Logout failed!');
      console.error('Logout error:', err);
    }
  };

  const register = async (email: string, password: string,name?: string) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCred.user.getIdToken();
      localStorage.setItem('token', token);
      setToken(token);
      if (name) {
        await setDoc(doc(db, 'users', userCred.user.uid), {
          name,
          email,
          createdAt: new Date().toISOString()
        });
      }
      toast.success('Registered successfully!');
    } catch (err: any) {
      console.error('[AuthProvider] Registration error:', err);
      toast.error(err.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      localStorage.setItem('token', token);
      setToken(token);
      toast.success('Login successful!');
    } catch (err: any) {
      toast.error(err.message);
      console.error('Login error:', err);
    }
  };
  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (err: any) {
      console.error('Forgot password error:', err);
      toast.error(err.message);
    }
  };
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user: token,
        login,
        logout,
        isAuthenticated,
        register,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
