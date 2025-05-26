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
    id: '79e041814d30ce4bbd4981d1',
    model: '/models/nike_military.glb',
  });

  const handleTryOn = () => {
    navigate(`/collection/shoes?product=${selectedShoe.id}&mode=ar`);
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
