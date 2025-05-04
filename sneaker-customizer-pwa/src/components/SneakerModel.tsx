import React from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface SneakerModelProps {
  modelPath: string;
  color: string;
  texture: string;
}

const SneakerModel: React.FC<SneakerModelProps> = ({ modelPath, color, texture }) => {
  const gltf = useGLTF(modelPath) as any;
  const loadedTexture = texture
    ? useLoader(THREE.TextureLoader, texture)
    : null;

  return (
    <group scale={1.5}>
      {Object.entries(gltf.nodes).map(([key, node]: [string, any]) => {
        if (!node.geometry) return null;

        return (
          <mesh
            key={key}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            {/* 🔥 Conditional material */}
            {color || texture ? (
              <meshStandardMaterial
                color={color || 'white'}
                map={loadedTexture || undefined}
              />
            ) : (
              // ✅ Use original material if no customization
              <primitive object={node.material} attach="material" />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

export default SneakerModel;
