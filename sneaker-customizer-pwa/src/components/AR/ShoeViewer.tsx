import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {
  modelPath: string;
}

function ShoeModel({ modelPath }: Props) {
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      setScene(gltf.scene);
    });
  }, [modelPath]);

  if (!scene) return null;

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

export default function ShoeViewer({ modelPath }: Props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <ShoeModel modelPath={modelPath} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
