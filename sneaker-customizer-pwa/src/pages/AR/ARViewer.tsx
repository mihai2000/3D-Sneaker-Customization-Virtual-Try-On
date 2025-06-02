import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DeepAR, initialize } from 'deepar';
import { QRCodeSVG } from 'qrcode.react';
import ShoeSelector from '../../components/AR/ShoeSelector';
import './ARViewer.scss';
import Layout from '../../components/Layout/Layout';
import { Button } from '@mui/material';
import threeDIcon from '../../assets/3D.svg';
import { Shoe } from '../../interfaces/shoeInterface';
// import { shoes } from '../../data/shoeData';
import { fetchProducts } from '../../services/products';

function isMobileDevice() {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
export default function ARViewer() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [allShoes, setAllShoes] = useState<Shoe[]>([]);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [deepARInstance, setDeepARInstance] = useState<DeepAR | null>(null);
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products and select one by productId
  useEffect(() => {
    const loadShoes = async () => {
      try {
        const products = await fetchProducts();
        const validShoes = (products as Shoe[]).filter(
          (shoe) => typeof shoe.effect === 'string' && shoe.effect.trim() !== ''
        );
        setAllShoes(validShoes);

        const productId = params.get('product');
        const initial =
          validShoes.find((s) => s.id === productId) || validShoes[0];
        setSelectedShoe(initial);
      } catch (error) {
        console.error('Error fetching shoes for ARViewer:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShoes();
    setIsMobile(isMobileDevice());
  }, [params]);

  // 🔁 Update selected shoe when productId in URL changes
  useEffect(() => {
    const productId = params.get('product');
    const match = allShoes.find((s) => s.id === productId);
    if (match) setSelectedShoe(match);
  }, [params, allShoes]);

  useEffect(() => {
    if (!isMobile || initializedRef.current || !selectedShoe) return;
    initializedRef.current = true;

    const initAR = async () => {
      try {
        const deepAR = await initialize({
          licenseKey: import.meta.env.VITE_DEEPAR_SDK_KEY,
          canvas: document.getElementById('deepar-canvas') as HTMLCanvasElement,
          effect: selectedShoe.effect,
          additionalOptions: {
            cameraConfig: {
              disableDefaultCamera: false,
              facingMode: 'environment',
              cameraPermissionAsked: () =>
                console.log('Camera permission requested'),
              cameraPermissionGranted: () =>
                console.log('Camera permission granted'),
            },
            footTrackingConfig: {
              poseEstimationWasmPath:
                '/deepar/wasm/libxzimgPoseEstimation.wasm',
              detectorPath: '/deepar/models/foot/foot-detection-96x96x6.bin',
              trackerPath:
                '/deepar/models/foot/foot-keyps-superfast-23JUN2024.bin',
              objPath: '/deepar/models/foot/foot-right-200.obj',
              tfjsBackendWasmPath: '/deepar/wasm/tfjs-backend-wasm.wasm',
              tfjsBackendWasmSimdPath:
                '/deepar/wasm/tfjs-backend-wasm-simd.wasm',
              tfjsBackendWasmThreadedSimdPath:
                '/deepar/wasm/tfjs-backend-wasm-threaded-simd.wasm',
            },
            hint: 'footInit',
          },
        });

        deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
          const feetText = document.getElementById('feet-text');
          // Hide the text when the feet are first detected.
          if ((leftFoot.detected || rightFoot.detected) && feetText) {
            feetText.style.display = 'none';
            deepAR.callbacks.onFeetTracked = undefined; // Unregister from the callback.
          }
        };
        setDeepARInstance(deepAR);
      } catch (error) {
        console.error('AR initialization error:', error);
        alert(
          `AR failed: ${error instanceof Error ? error.message : String(error)}`
        );
        initializedRef.current = false;
      }
    };

    setTimeout(initAR, 0);
  }, [selectedShoe, isMobile]);

  // 🌀 Switch effect if shoe changes
  useEffect(() => {
    if (deepARInstance && isMobile && selectedShoe) {
      deepARInstance.switchEffect(selectedShoe.effect);
    }
  }, [deepARInstance, isMobile, selectedShoe]);

  const handleSelect = (shoe: Shoe) => {
    setParams({ product: shoe.id, mode: 'ar' });
  };

  const handleBackToTryOn = async () => {
    try {
      if (deepARInstance) {
        await deepARInstance.shutdown();
      }
    } catch (err) {
      console.warn('DeepAR shutdown warning:', err);
    }
    navigate(`/try-ar?product=${selectedShoe?.id}`);
  };

  if (loading || !selectedShoe) return <p>Loading AR Viewer... 🛰️</p>;

  const qrUrl = `${window.location.origin}/collection/shoes?product=${selectedShoe.id}&mode=ar`;

  return isMobile ? (
    <div className="mobile-container">
      <canvas
        id="deepar-canvas"
        width={384}
        height={720}
        style={{ width: '100%', height: '100%', margin: '0' }}
      />
      <div className="mobile-sub-container">
        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
          <p style={{ color: '#fff' }}>{selectedShoe?.name}</p>
          <p id="feet-text"></p>
          <Button
            variant="contained"
            className="tryon-button"
            startIcon={
              <img
                src={threeDIcon}
                alt="shoe icon"
                style={{ width: '20px', height: '20px' }}
              />
            }
            onClick={handleBackToTryOn}
          >
            3D
          </Button>
        </div>
        <ShoeSelector
          onSelect={handleSelect}
          selectedShoeId={selectedShoe.id}
          shoes={allShoes}
        />
      </div>
    </div>
  ) : (
    <Layout>
      <div className="tryon-container">
        <div className="qr-desktop-view">
          <p className="mini-title">ShoeAR</p>
          <Button
            variant="contained"
            className="tryon-button"
            startIcon={
              <img
                src={threeDIcon}
                alt="shoe icon"
                style={{ width: '20px', height: '20px', marginLeft: '8px' }}
              />
            }
            onClick={handleBackToTryOn}
          >
            3D
          </Button>
          <h2>This one's best on mobile</h2>
          <QRCodeSVG value={qrUrl} size={400} />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#aaa' }}>
            Scan to experience in AR
          </p>
          <div className="desktop-shoe-carousel">
            <p className="selected-shoe-name">{selectedShoe?.name}</p>
            <ShoeSelector
              onSelect={handleSelect}
              selectedShoeId={selectedShoe.id}
              shoes={allShoes}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
