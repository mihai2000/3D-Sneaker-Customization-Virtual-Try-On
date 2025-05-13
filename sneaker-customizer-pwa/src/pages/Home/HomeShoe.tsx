import { useGLTF, Center } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Shoe() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Red_Runner_0202150754_texture.glb');

  const [visible, setVisible] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width > 2400) setScale(1);
      else if (width > 1920) setScale(0.8);
      else if (width > 1440) setScale(0.6);
      else if (width > 1024) setScale(0.4);
      else setScale(0.2);
    };

    updateScale(); // initial
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => setRotationEnabled(true), 1500);
  }, []);

  useFrame(() => {
    if (rotationEnabled && modelRef.current) {
      modelRef.current.rotation.y += 0.0025;
    }
  });

  return (
    <Center disableZ>
      <group ref={modelRef} visible={visible} scale={scale}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

useGLTF.preload('/models/Red_Runner_0202150754_texture.glb');
