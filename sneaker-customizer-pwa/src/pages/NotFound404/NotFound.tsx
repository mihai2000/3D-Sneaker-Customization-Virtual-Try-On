import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        background: '#111',
        color: '#fff',
      }}
    >
      <h1 style={{ fontSize: '4rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>Oops! Page not found.</p>
      <Link
        to="/"
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
