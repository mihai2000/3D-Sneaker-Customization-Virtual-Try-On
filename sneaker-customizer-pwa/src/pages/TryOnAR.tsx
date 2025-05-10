// import { useRef } from "react";
// import CameraFeed from "../ar/CameraFeed";
// import FootTracker from "../ar/FootTracker";
// import ShoeScene from "../three/ShoeScene";

// export default function TryOnAR() {
// 	const sceneRef = useRef<any>(null);

// 	const handleFootPositions = (positions: { left: any; right: any }) => {
// 		sceneRef.current?.updatePositions(positions);
// 	};

// 	return (
// 		<>
// 			<CameraFeed />
// 			<ShoeScene ref={sceneRef} />
// 			<FootTracker onTrack={handleFootPositions} />
// 			<div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
// 				<button
// 					onClick={() => (window.location.href = "/")}
// 					style={{
// 						padding: "0.75rem 1.5rem",
// 						fontSize: "1rem",
// 						borderRadius: "8px",
// 						backgroundColor: "#333",
// 						color: "#fff",
// 						border: "none",
// 						cursor: "pointer",
// 					}}
// 				>
// 					Back to Customizer
// 				</button>
// 			</div>
// 		</>
// 	);
// }
// ✅ TryOnAR.tsx
import { useRef } from 'react';
import XRShoes, { FootData, SceneHandle } from '../three/XRShoes';
import FootTracker from '../ar/FootTracker';
import CameraFeed from '../ar/CameraFeed';

export default function TryOnAR() {
  const sceneRef = useRef<SceneHandle>(null);

  const handleFootPositions = (feet: { left: FootData; right: FootData }) => {
    alert(`Tracking feet: ${JSON.stringify(feet)}`);
    console.log('Tracking feet:', feet);

    sceneRef.current?.updatePositions(feet);
  };

  return (
    <>
      <CameraFeed />
      <XRShoes ref={sceneRef} />
      <FootTracker onTrack={handleFootPositions} />
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Back to Customizer
        </button>
      </div>
    </>
  );
}
