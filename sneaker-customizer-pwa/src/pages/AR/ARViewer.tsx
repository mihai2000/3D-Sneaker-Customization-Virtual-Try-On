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

const shoes: Shoe[] = [
  {
    id: 'shoe1',
    name: 'Nike Air Zoom Pegasus 36',
    effect: 'nike_air_zoom_pegasus_36.deepar',
    image: '/images/Nike_Air_Zoom_Pegasus_36.jpg',
  },
  {
    id: 'shoe2',
    name: 'Nike SB Zoom Dunk',
    effect: 'nike_military.deepar',
    image: '/images/Nike_SB_Zoom_Dunk.jpg',
  },
];

function isMobileDevice() {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
export default function ARViewer() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = params.get('product') || shoes[0].id;
  const [selectedShoe, setSelectedShoe] = useState<Shoe>(
    () => shoes.find((s) => s.id === productId) || shoes[0]
  );
  const initializedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deepARInstance, setDeepARInstance] = useState<DeepAR | null>(null);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    const newShoe = shoes.find((s) => s.id === productId);
    if (newShoe) {
      setSelectedShoe(newShoe);
    }
  }, [productId]);

  useEffect(() => {
    if (!isMobile || initializedRef.current || !selectedShoe) return;
    initializedRef.current = true;

    const initAR = async () => {
      try {
        const deepAR = await initialize({
          licenseKey: import.meta.env.VITE_DEEPAR_SDK_KEY,
          canvas: document.getElementById('deepar-canvas') as HTMLCanvasElement,
          effect: `/effects/${selectedShoe?.id}/${selectedShoe?.effect}`,
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
        console.log('deepAR.effect');
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

  useEffect(() => {
    if (deepARInstance && isMobile) {
      const effectPath = `/effects/${selectedShoe.id}/${selectedShoe.effect}`;
      deepARInstance.switchEffect(effectPath);
    }
  }, [selectedShoe.id]);

  const handleSelect = (shoe: Shoe) => {
    setParams({ product: shoe.id, mode: 'ar' });
  };

  const handleBackToTryOn = async () => {
    try {
      if (deepARInstance) {
        deepARInstance.shutdown();
      }
    } catch (error) {
      console.warn('Error during DeepAR shutdown:', error);
    }
    navigate('/try-ar');
  };

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
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
