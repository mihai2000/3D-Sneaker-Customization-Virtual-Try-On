// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import ShoeViewer from '../../components/AR/ShoeViewer';
// import ShoeSelector from '../../components/AR/ShoeSelector';

// interface Shoe {
//   id: string;
//   model: string;
// }

// export default function TryOnAR() {
//   const navigate = useNavigate();
//   const [selectedShoe, setSelectedShoe] = useState<Shoe>({
//     id: '65e041814d30ce4bbd4981d1',
//     model: '/models/nike_air_zoom_pegasus_36.glb',
//   });

//   const handleTryOn = async () => {
//     try {
//       // Camera permission
//       await navigator.mediaDevices.getUserMedia({ video: true });

//       // Motion permission (iOS)
//       if (
//         typeof DeviceMotionEvent !== 'undefined' &&
//         (DeviceMotionEvent as any).requestPermission
//       ) {
//         const permission = await (DeviceMotionEvent as any).requestPermission();
//         if (permission !== 'granted') {
//           alert('Motion permission not granted. AR may not work properly.');
//         }
//       }

//       // Navigate to AR
//       navigate(`/collection/shoes?product=${selectedShoe.id}&mode=ar`);
//     } catch (error) {
//       alert('Please allow camera access to use AR.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Try Our Shoes</h2>
//       <ShoeViewer modelPath={selectedShoe.model} />
//       <ShoeSelector onSelect={setSelectedShoe} />
//       <button onClick={handleTryOn}>Try On</button>
//     </div>
//   );
// }
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ShoeSelector from '../../components/AR/ShoeSelector';
import ShoeViewer from '../../components/AR/ShoeViewer';

interface Shoe {
  id: string;
  model: string;
  image: string;
}

const shoes: Shoe[] = [
  {
    id: 'shoe1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
    image: '/images/nike_air_zoom_pegasus_36.png',
  },
  {
    id: 'shoe2',
    model: '/models/nike_military.glb',
    image: '/images/nike_military.png',
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{ fontSize: '2rem', marginBottom: '10px', paddingTop: '64px' }}
      >
        Try On Sneakers
      </h1>
      <div style={{ width: '90%', height: '70%' }}>
        <ShoeViewer modelPath={selectedShoe.model} />
      </div>
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <ShoeSelector onSelect={setSelectedShoe} />
        <button
          onClick={handleTryOn}
          style={{
            marginTop: '10px',
            padding: '15px 30px',
            fontSize: '1.2rem',
            width: '100%',
            maxWidth: '400px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#000',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Try On
        </button>
      </div>
    </div>
  );
}
