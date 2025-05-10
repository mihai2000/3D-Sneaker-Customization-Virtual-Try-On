import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const register = async (email: string, password: string) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCred.user.getIdToken();
      localStorage.setItem('token', token);
      setToken(token);
      console.log('[AuthProvider] User registered:', email);
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

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user: token, login, logout, isAuthenticated, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
