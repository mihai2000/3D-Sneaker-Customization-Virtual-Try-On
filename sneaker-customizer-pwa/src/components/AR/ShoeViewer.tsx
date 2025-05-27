// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// interface Props {
//   modelPath: string;
// }

// export default function ShoeViewer({ modelPath }: Props) {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     camera.position.z = 2;

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(300, 300);
//     if (mountRef.current) mountRef.current.innerHTML = '';
//     mountRef.current?.appendChild(renderer.domElement);

//     const light = new THREE.HemisphereLight(0xffffff, 0x444444);
//     scene.add(light);

//     const loader = new GLTFLoader();
//     loader.load(modelPath, (gltf) => {
//       scene.add(gltf.scene);
//     });

//     const animate = function () {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();
//   }, [modelPath]);

//   return <div ref={mountRef}></div>;
// }
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  modelPath: string;
}

function ShoeModel({ modelPath }: Props) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

export default function ShoeViewer({ modelPath }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <ShoeModel modelPath={modelPath} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
