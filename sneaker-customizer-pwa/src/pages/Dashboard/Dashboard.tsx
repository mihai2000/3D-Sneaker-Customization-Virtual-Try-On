import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';
import { fetchUserProfile, UserProfile } from '../../services/users';

export const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const profile = await fetchUserProfile(currentUser.uid);
      setUserData(profile);
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading)
    return (
      <div style={{ color: '#ccc', padding: '2rem' }}>
        Loading dashboard... 🌀
      </div>
    );
  if (!userData)
    return (
      <div style={{ color: '#ccc', padding: '2rem' }}>
        No user data found 🕵️
      </div>
    );

  return userData.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};
