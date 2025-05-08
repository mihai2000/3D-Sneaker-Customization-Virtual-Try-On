import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraFeed from '../ar/CameraFeed';
import ShoeScene from '../three/ShoeScene';
import FootTracker from '../ar/FootTracker';

export default function TryOnAR() {
  const shoeRef = useRef<any>(null);
  const navigate = useNavigate();

  const updateFootPosition = (pos: { x: number; y: number; z: number }) => {
    if (shoeRef.current) shoeRef.current.updatePosition(pos);
  };

  return (
    <>
      <CameraFeed />
      <ShoeScene ref={shoeRef} />
      <FootTracker onTrack={updateFootPosition} />

      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Back to Customizer
        </button>
      </div>
    </>
  );
}
