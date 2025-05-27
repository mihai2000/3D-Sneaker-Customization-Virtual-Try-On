import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ShoeViewer from '../../components/AR/ShoeViewer';
import ShoeSelector from '../../components/AR/ShoeSelector';

interface Shoe {
  id: string;
  model: string;
}

export default function TryOnAR() {
  const navigate = useNavigate();
  const [selectedShoe, setSelectedShoe] = useState<Shoe>({
    id: '65e041814d30ce4bbd4981d1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
  });

  const handleTryOn = async () => {
    try {
      // Camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });

      // Motion permission (iOS)
      if (
        typeof DeviceMotionEvent !== 'undefined' &&
        (DeviceMotionEvent as any).requestPermission
      ) {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== 'granted') {
          alert('Motion permission not granted. AR may not work properly.');
        }
      }

      // Navigate to AR
      navigate(`/collection/shoes?product=${selectedShoe.id}&mode=ar`);
    } catch (error) {
      alert('Please allow camera access to use AR.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Try Our Shoes</h2>
      <ShoeViewer modelPath={selectedShoe.model} />
      <ShoeSelector onSelect={setSelectedShoe} />
      <button onClick={handleTryOn}>Try On</button>
    </div>
  );
}
