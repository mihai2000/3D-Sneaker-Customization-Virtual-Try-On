// import { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import QRCode from 'react-qr-code';

// declare global {
//   interface Window {
//     deepar: any;
//   }
// }

// // Reliable mobile detection
// const isMobile = () => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   );
// };

// export default function ARViewer() {
//   const [params] = useSearchParams();
//   const productId = params.get('product');

//   useEffect(() => {
//     if (isMobile()) {
//       const script = document.createElement('script');
//       script.src = '/deepar/deepar.js';
//       script.onload = async () => {
//         const DeepAR = window.deepar;
//         const deepAR = new DeepAR({
//           licenseKey: import.meta.env.VITE_DEEPAR_SDK_KEY,
//           canvas: document.getElementById('deepar-canvas'),
//           libPath: '/deepar/',
//         });
//         await deepAR.downloadFaceTrackingModel();
//         await deepAR.initialize();
//         deepAR.switchEffect(0, 'slot', `/effects/${productId}/`);
//       };
//       document.body.appendChild(script);
//     }
//   }, [productId]);

//   if (!isMobile()) {
//     const mobileURL = `${window.location.origin}/collection/shoes?product=${productId}&mode=ar`;
//     return (
//       <div>
//         <h3>Scan to Try On!</h3>
//         <QRCode value={mobileURL} size={256} />
//       </div>
//     );
//   }

//   return (
//     <canvas
//       id="deepar-canvas"
//       width="640"
//       height="480"
//       style={{ width: '100%' }}
//     />
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { initialize } from 'deepar';
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
  },
  {
    id: 'shoe2',
    name: 'Nike SB Zoom Dunk',
    effect: 'nike_military.deepar',
  },
];

function isMobileDevice() {
  // return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
export default function ARViewer() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = params.get('product') || shoes[0].id;
  const initializedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const selectedShoe = shoes.find((shoe) => shoe.id === productId) || shoes[0];

  useEffect(() => {
    setIsMobile(isMobileDevice());

    if (!isMobile || initializedRef.current || !selectedShoe) return;
    initializedRef.current = true;

    const initAR = async () => {
      try {
        await initialize({
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
          },
        });
      } catch (error) {
        console.error('AR initialization error:', error);
        alert(
          `AR failed: ${error instanceof Error ? error.message : String(error)}`
        );
        initializedRef.current = false;
      }
    };

    initAR();
  }, [selectedShoe, isMobile]);

  const handleSelect = (shoe: (typeof shoes)[number]) => {
    setParams({ product: shoe.id, mode: 'ar' });
  };

  const qrUrl = `${window.location.origin}/collection/shoes?product=${selectedShoe.id}&mode=ar`;

  return isMobile ? (
    <canvas
      id="deepar-canvas"
      width="380"
      height="720"
      style={{ width: '100%', margin: '0' }}
    />
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
            onClick={() => navigate('/try-ar')}
          >
            3D
          </Button>
          <h2>This one's best on mobile</h2>
          <QRCodeSVG value={qrUrl} size={500} />
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
