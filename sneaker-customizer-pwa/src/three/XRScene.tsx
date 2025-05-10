// XRScene.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export default function XRScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    containerRef.current?.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      '/models/shoe-draco.glb',
      (gltf) => {
        const shoe = gltf.scene;
        shoe.scale.set(0.2, 0.2, 0.2);
        shoe.position.set(0, 0, -0.5); // 50cm in front of camera
        scene.add(shoe);
      },
      undefined,
      (error) => console.error('Failed to load model:', error)
    );

    document.body.appendChild(
      ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
    );

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      const arBtn = document.querySelector('button[style*="AR"]');
      if (arBtn && arBtn.parentNode) {
        arBtn.parentNode.removeChild(arBtn);
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
