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
// without qr code
// import { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// declare global {
//   interface Window {
//     deepar: any;
//   }
// }

// export default function ARViewer() {
//   const [params] = useSearchParams();
//   const productId = params.get('product');

//   useEffect(() => {
//     const initAR = async () => {
//       try {
//         // Request camera access explicitly
//         await navigator.mediaDevices.getUserMedia({ video: true });

//         // Load DeepAR script dynamically
//         const script = document.createElement('script');
//         script.src = '/deepar/deepar.js';
//         script.onload = async () => {
//           const DeepAR = window.deepar;
//           const deepAR = new DeepAR({
//             licenseKey: import.meta.env.VITE_DEEPAR_SDK_KEY,
//             canvas: document.getElementById('deepar-canvas'),
//             libPath: '/deepar/',
//           });

//           await deepAR.downloadFaceTrackingModel();
//           await deepAR.initialize();
//           deepAR.switchEffect(0, 'slot', `/effects/${productId}/`);
//         };
//         document.body.appendChild(script);
//       } catch (err) {
//         alert('Please allow camera access to try on shoes in AR.');
//         console.error('Camera access denied:', err);
//       }
//     };

//     initAR();
//   }, [productId]);

//   return (
//     <canvas
//       id="deepar-canvas"
//       width="640"
//       height="480"
//       style={{ width: '100%' }}
//     />
//   );
// }
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initialize } from 'deepar';

export default function ARViewer() {
  const [params] = useSearchParams();
  const productId = params.get('product');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initAR = async () => {
      try {
        await initialize({
          licenseKey: import.meta.env.VITE_DEEPAR_SDK_KEY,
          canvas: document.getElementById('deepar-canvas') as HTMLCanvasElement,
          effect: `/effects/${productId}/nike_air_zoom_pegasus_36.deepar`,
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
  }, [productId]);

  return (
    <canvas
      id="deepar-canvas"
      width="380"
      height="720"
      style={{ width: '100%', margin: '0' }}
    />
  );
}
