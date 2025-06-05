import React from 'react';
import { UserProfile } from '../services/users';

interface Props {
  user: UserProfile;
  role: 'admin' | 'user';
  children: React.ReactNode;
}

export const RoleGate: React.FC<Props> = ({ user, role, children }) => {
  if (user.role !== role) return null;
  return <>{children}</>;
};
