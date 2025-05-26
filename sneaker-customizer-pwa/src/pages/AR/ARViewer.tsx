import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

declare global {
  interface Window {
    deepar: any;
  }
}

// Reliable mobile detection
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function ARViewer() {
  const [params] = useSearchParams();
  const productId = params.get('product');

  useEffect(() => {
    if (isMobile()) {
      const script = document.createElement('script');
      script.src = '/deepar/deepar.js';
      script.onload = async () => {
        const DeepAR = window.deepar;
        const deepAR = new DeepAR({
          licenseKey: import.meta.env.VITE_DEEPAR_SDK_KEY,
          canvas: document.getElementById('deepar-canvas'),
          libPath: '/deepar/',
        });
        await deepAR.downloadFaceTrackingModel();
        await deepAR.initialize();
        deepAR.switchEffect(0, 'slot', `/effects/${productId}/`);
      };
      document.body.appendChild(script);
    }
  }, [productId]);

  if (!isMobile()) {
    const mobileURL = `${window.location.origin}/collection/shoes?product=${productId}&mode=ar`;
    return (
      <div>
        <h3>Scan to Try On!</h3>
        <QRCode value={mobileURL} size={256} />
      </div>
    );
  }

  return (
    <canvas
      id="deepar-canvas"
      width="640"
      height="480"
      style={{ width: '100%' }}
    />
  );
}
