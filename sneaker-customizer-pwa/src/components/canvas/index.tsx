import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Center } from '@react-three/drei';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Shoe from './Shoe';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0] }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, 10]}
        castShadow
      />
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.5}
        scale={10}
        blur={1.5}
        far={0.8}
      />

      <Environment files="/models/royal_esplanade_1k.hdr" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Suspense fallback={null}>
            <Shoe />
          </Suspense>
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
