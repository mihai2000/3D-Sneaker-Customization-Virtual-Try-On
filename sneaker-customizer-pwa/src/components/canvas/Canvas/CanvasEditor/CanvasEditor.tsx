import { Center, ContactShadows, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react';
import Backdrop from '../../Backdrop';
import CameraRig from '../../CameraRig';
import Shoe from '../../Shoe';
import '../Canvas.scss';

const CanvasEditor = forwardRef((_, ref) => {
  const shoeRef = useRef<any>();

  // Expose the shoe group via ref
  useImperativeHandle(ref, () => ({
    getScene: () => shoeRef.current,
  }));

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0] }}
      gl={{ preserveDrawingBuffer: true }}
      className="canvas-wrapper editor-glow-bg"
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
            <Shoe ref={shoeRef} />
          </Suspense>
        </Center>
      </CameraRig>
    </Canvas>
  );
});

export default CanvasEditor;
