import React, { useRef } from 'react';

interface ARViewerProps {
  modelPath: string; // e.g., '/models/air_jordan_1.glb'
}

const ARViewer: React.FC<ARViewerProps> = ({ modelPath }) => {
  const xrSessionRef = useRef<XRSession | null>(null);

  const handleARLaunch = async () => {
    if (navigator.xr) {
      try {
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
        if (isARSupported) {
          const session = await navigator.xr.requestSession('immersive-ar', {
            optionalFeatures: ['dom-overlay'],
            domOverlay: { root: document.body },
          });
          xrSessionRef.current = session;
          console.log('AR session started!');
        } else {
          alert('AR not supported on this device/browser.');
          window.open(modelPath, '_blank'); // fallback: open model directly
        }
      } catch (err) {
        console.error('Failed to start AR session', err);
        window.open(modelPath, '_blank'); // fallback
      }
    } else {
      alert('WebXR not supported in this browser.');
      window.open(modelPath, '_blank'); // fallback
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleARLaunch}
        className="bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
      >
        Try in AR
          </button>
          {/* <a href="/models/air_jordan_1.usdz" rel="ar">
  <button>Try in AR</button>
</a> */}

    </div>
  );
};

export default ARViewer;
