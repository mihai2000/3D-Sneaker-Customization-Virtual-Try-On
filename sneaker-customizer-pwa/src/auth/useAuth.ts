import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './AuthContext';

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
