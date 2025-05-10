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
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      '/models/nike_air_jordan.glb',
      (gltf) => {
        const shoe = gltf.scene;
        shoe.scale.set(0.2, 0.2, 0.2);
        shoe.position.set(0, 0, -0.5);
        scene.add(shoe);
      },
      undefined,
      (error) => console.error('Failed to load model:', error)
    );

    const arBtn = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
    });
    document.body.appendChild(arBtn);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.forceContextLoss();
      renderer.dispose();

      const arBtn = document.querySelector('button[style*="AR"]');
      if (arBtn && arBtn.parentNode) {
        arBtn.parentNode.removeChild(arBtn);
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
