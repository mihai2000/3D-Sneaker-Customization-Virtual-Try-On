import { createContext } from 'react';

export interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
