import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to your Dashboard 🎉</h2>

      <p style={{ marginTop: '1rem' }}>
        Customizer your shoes? <Link to="/customizer">Customize here</Link>
      </p>
    </div>
  );
}
