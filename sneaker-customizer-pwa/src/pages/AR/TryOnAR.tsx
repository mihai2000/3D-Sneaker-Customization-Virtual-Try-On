import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoeSelector from '../../components/AR/ShoeSelector';
import ShoeViewer from '../../components/AR/ShoeViewer';
import shoeIcon from '../../assets/shoe.svg';
import { Button } from '@mui/material';
import './TryOnAR.scss';
import { Shoe } from '../../interfaces/shoeInterface';
import { fetchProducts } from '../../services/products';
// import { shoes } from '../../data/shoeData';

export default function TryOnAR() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [allShoes, setAllShoes] = useState<Shoe[]>([]);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch shoes from Firestore and filter by non-empty effect
  useEffect(() => {
    const loadShoes = async () => {
      try {
        const products = await fetchProducts();
        const validShoes = (products as Shoe[]).filter(
          (shoe) => typeof shoe.effect === 'string' && shoe.effect.trim() !== ''
        );

        setAllShoes(validShoes);

        const urlProductId = params.get('product');
        const initial =
          validShoes.find((s) => s.id === urlProductId) || validShoes[0];

        setSelectedShoe(initial);
      } catch (err) {
        console.error('Error fetching shoes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShoes();
  }, [params]);

  // 🔁 Update selectedShoe when URL changes
  useEffect(() => {
    const urlProductId = params.get('product');
    const found = allShoes.find((s) => s.id === urlProductId);
    if (found) setSelectedShoe(found);
  }, [params, allShoes]);

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

      if (selectedShoe) {
        navigate(`/collection/shoes?product=${selectedShoe.id}&mode=ar`);
      }
    } catch (error) {
      alert('Please allow camera access to use AR.');
      console.error(error);
    }
  };

  if (loading || !selectedShoe) return <p>Loading AR module... 🛠️</p>;

  return (
    <div className="tryon-container">
      <h1>Try On Sneakers</h1>

      <div className="viewer-wrapper">
        <ShoeViewer modelPath={selectedShoe.modelUrl} />
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
            shoes={allShoes}
          />
        </div>
      </div>
    </div>
  );
}
