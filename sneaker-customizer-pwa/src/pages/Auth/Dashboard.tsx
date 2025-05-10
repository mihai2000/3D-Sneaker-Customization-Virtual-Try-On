import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to your Dashboard 🎉</h2>

      <button
        onClick={handleLogout}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Logout
      </button>
      <p style={{ marginTop: '1rem' }}>
        Customizer your shoes? <Link to="/customizer">Customize here</Link>
      </p>
    </div>
  );
}
