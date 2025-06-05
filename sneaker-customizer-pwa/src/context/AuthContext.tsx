import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface UserProfileData {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  avatarUrl?: string;
}
export interface AuthContextProps {
  user: User | null;
  userData: UserProfileData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  register: (email: string, password: string, name?: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
