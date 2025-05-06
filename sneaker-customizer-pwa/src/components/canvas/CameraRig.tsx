import React, { useRef, PropsWithChildren } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import * as THREE from 'three';
import state from '../../store';

const CameraRig: React.FC<PropsWithChildren> = ({ children }) => {
  const group = useRef<THREE.Group>(null);
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPosition: [number, number, number] = [-0.85, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.7, 3];
    } else {
      targetPosition = isMobile ? [0, 0, 3] : [0, 0, 2];
    }

    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    if (group.current) {
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 2, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
