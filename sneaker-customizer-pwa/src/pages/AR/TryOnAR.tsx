import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoeSelector from '../../components/AR/ShoeSelector';
import ShoeViewer from '../../components/AR/ShoeViewer';
import shoeIcon from '../../assets/shoe.svg';
import { Button } from '@mui/material';
import './TryOnAR.scss';
import { Shoe } from '../../interfaces/shoeInterface';
import { shoes } from '../../data/shoeData';

export default function TryOnAR() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const productId = params.get('product') || shoes[0].id;
  const [selectedShoe, setSelectedShoe] = useState<Shoe>(
    shoes.find((s) => s.id === productId) || shoes[0]
  );

  useEffect(() => {
    const shoe = shoes.find((s) => s.id === productId);
    if (shoe) setSelectedShoe(shoe);
  }, [productId]);

  const handleSelect = (shoe: Shoe) => {
    setParams({ product: shoe.id });
  };
  const handleTryOn = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });

      if (
        typeof DeviceMotionEvent !== 'undefined' &&
        (DeviceMotionEvent as any).requestPermission
      ) {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== 'granted') {
          alert('Motion permission not granted. AR may not work properly.');
        }
      }
      navigate(`/collection/shoes?product=${selectedShoe.id}&mode=ar`);
    } catch (error) {
      alert('Please allow camera access to use AR.');
      console.error(error);
    }
  };

  return (
    <div className="tryon-container">
      <h1>Try On Sneakers</h1>

      <div className="viewer-wrapper">
        <ShoeViewer modelPath={selectedShoe.model} />
      </div>
      <div className="tryon-carousel-container">
        <div className="tryon-info-box">
          <span>{selectedShoe.name}</span>
          <Button
            variant="contained"
            className="tryon-button"
            startIcon={
              <img
                src={shoeIcon}
                alt="shoe icon"
                style={{ width: '20px', height: '20px', marginLeft: '8px' }}
              />
            }
            onClick={handleTryOn}
          >
            Try On
          </Button>
        </div>
        <div className="carousel-wrapper">
          <ShoeSelector
            onSelect={handleSelect}
            selectedShoeId={selectedShoe.id}
          />
        </div>
      </div>
    </div>
  );
}
