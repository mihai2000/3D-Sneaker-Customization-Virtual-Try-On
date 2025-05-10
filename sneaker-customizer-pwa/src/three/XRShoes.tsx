import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

// 👟 Shared type
export type FootData = {
  position: { x: number; y: number; z: number };
  angle: number;
};

// 👟 Handle type
export type SceneHandle = {
  updatePositions: (feet: { left: FootData; right: FootData }) => void;
};

const XRShoes = forwardRef<SceneHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftShoeRef = useRef<THREE.Object3D>();
  const rightShoeRef = useRef<THREE.Object3D>();

  useImperativeHandle(ref, () => ({
    updatePositions({ left, right }) {
      if (leftShoeRef.current) {
        leftShoeRef.current.position.set(
          left.position.x,
          left.position.y,
          left.position.z
        );
        leftShoeRef.current.rotation.y = -left.angle;
      }
      if (rightShoeRef.current) {
        rightShoeRef.current.position.set(
          right.position.x,
          right.position.y,
          right.position.z
        );
        rightShoeRef.current.rotation.y = -right.angle;
      }
    },
  }));

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    if (
      containerRef.current &&
      !containerRef.current.contains(renderer.domElement)
    ) {
      containerRef.current.appendChild(renderer.domElement);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(1, 1, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    const loadShoe = (
      ref: React.MutableRefObject<THREE.Object3D | undefined>,
      offsetX: number
    ) => {
      loader.load('/models/shoe-draco.glb', (gltf) => {
        const shoe = gltf.scene;
        shoe.scale.set(0.2, 0.2, 0.2);
        shoe.position.x += offsetX;
        ref.current = shoe;
        scene.add(shoe);
      });
    };

    loadShoe(leftShoeRef, -0.05);
    loadShoe(rightShoeRef, 0.05);

    document.body.appendChild(
      ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
    );

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} />;
});

export default XRShoes;
