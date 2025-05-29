import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoeSelector from '../../components/AR/ShoeSelector';
import ShoeViewer from '../../components/AR/ShoeViewer';
import shoeIcon from '../../assets/shoe.svg';
import { Button } from '@mui/material';
import './TryOnAR.scss';
import { Shoe } from '../../interfaces/shoeInterface';

const shoes: Shoe[] = [
  {
    id: 'shoe1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
    image: '/images/Nike_Air_Zoom_Pegasus_36.jpg',
    name: 'Nike Air Zoom Pegasus 36',
  },
  {
    id: 'shoe2',
    model: '/models/nike_military.glb',
    image: '/images/Nike_SB_Zoom_Dunk.jpg',
    name: 'Nike SB Zoom Dunk',
  },
];

export default function TryOnAR() {
  const navigate = useNavigate();
  const [selectedShoe, setSelectedShoe] = useState<Shoe>(shoes[1]);
  const [params, setParams] = useSearchParams();
  const productId = params.get('product') || shoes[1].id;

  useEffect(() => {
    setSelectedShoe(shoes.find((shoe) => shoe.id === productId) || shoes[1]);
  }, [productId]);

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
            onSelect={(shoe) => {
              setSelectedShoe(shoe);
              setParams({ product: shoe.id });
            }}
            selectedShoeId={selectedShoe.id}
          />
        </div>
      </div>
    </div>
  );
}
