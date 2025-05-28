import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {
  modelPath: string | undefined;
}

function ShoeModel({ modelPath }: Props) {
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!modelPath) return;
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center); // Center the model

      setScene(model);
    });
  }, [modelPath]);

  if (!scene) return null;

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

export default function ShoeViewer({ modelPath }: Props) {
  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <ShoeModel modelPath={modelPath} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
