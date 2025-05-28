import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ShoeSelector from '../../components/AR/ShoeSelector';
import ShoeViewer from '../../components/AR/ShoeViewer';
import './TryOnAR.scss';
import { Button } from '@mui/material';
import shoeIcon from '../../assets/shoe.svg';

interface Shoe {
  id: string;
  model: string;
  image: string;
  name: string;
}

const shoes: Shoe[] = [
  {
    id: 'shoe1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
    image:
      'https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.firebasestorage.app/o/Nike_Air_Zoom_Pegasus_36.jpg?alt=media&token=97495791-2eb4-4a6f-939d-217605dd0695',
    name: 'Nike Air Zoom Pegasus 36',
  },
  {
    id: 'shoe2',
    model: '/models/nike_military.glb',
    image:
      'https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.firebasestorage.app/o/Nike_SB_Zoom_Dunk.avif?alt=media&token=24d96c98-1db9-42eb-bcbd-f95aef5a96cb',
    name: 'Nike SB Zoom Dunk',
  },
];

export default function TryOnAR() {
  const navigate = useNavigate();
  const [selectedShoe, setSelectedShoe] = useState<Shoe>(shoes[1]);

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
                onClick={handleTryOn}
              />
            }
          >
            Try On
          </Button>
        </div>
        <div className="carousel-wrapper">
          <ShoeSelector
            onSelect={setSelectedShoe}
            selectedShoeId={selectedShoe.id}
          />
        </div>
      </div>
    </div>
  );
}
