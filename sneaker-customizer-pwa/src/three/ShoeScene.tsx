import { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default forwardRef(function ShoeScene(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<THREE.Object3D>();

  useImperativeHandle(ref, () => ({
    updatePosition(pos: { x: number; y: number; z: number }) {
      if (shoeRef.current) {
        shoeRef.current.position.set(pos.x, pos.y, pos.z);
      }
    },
  }));

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load('/assets/shoe.glb', (gltf) => {
      shoeRef.current = gltf.scene;
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      scene.add(gltf.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
    />
  );
});
