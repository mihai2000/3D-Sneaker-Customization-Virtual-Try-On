import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export default function XRScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    if (
      containerRef.current &&
      !containerRef.current.contains(renderer.domElement)
    ) {
      containerRef.current.appendChild(renderer.domElement);
    }

    scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    const arBtn = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
    });
    document.body.appendChild(arBtn);

    let hitTestSource: XRHitTestSource | null = null;
    let localSpace: XRReferenceSpace | null = null;
    const lastHitMatrix = new THREE.Matrix4();
    let shoe: THREE.Object3D | null = null;

    const onSelect = () => {
      if (!shoe) {
        loader.load('/models/nike-air-jordan.glb', (gltf) => {
          shoe = gltf.scene;
          shoe.scale.set(0.2, 0.2, 0.2);
          shoe.position.setFromMatrixPosition(lastHitMatrix);
          scene.add(shoe);
        });
      } else {
        shoe.position.setFromMatrixPosition(lastHitMatrix);
      }
    };

    const handleSessionStart = async () => {
      const session = renderer.xr.getSession();
      if (!session) return;

      try {
        localSpace = await session.requestReferenceSpace('viewer');
        const hitSource = await session.requestHitTestSource?.({
          space: localSpace,
        });
        hitTestSource = hitSource ?? null;

        const controller = renderer.xr.getController(0);
        controller.addEventListener('select', onSelect);
        scene.add(controller);
      } catch (err) {
        console.warn('Hit test setup failed:', err);
      }
    };

    renderer.xr.addEventListener('sessionstart', handleSessionStart);

    renderer.setAnimationLoop((_, frame) => {
      if (frame && hitTestSource && localSpace) {
        const results = frame.getHitTestResults(hitTestSource);
        if (results.length > 0) {
          const pose = results[0].getPose(localSpace);
          if (pose) {
            lastHitMatrix.makeTranslation(
              pose.transform.position.x,
              pose.transform.position.y,
              pose.transform.position.z
            );
          }
        }
      }

      renderer.render(scene, camera);
    });

    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      const arBtn = document.querySelector('button[style*="AR"]');
      if (arBtn && arBtn.parentNode) {
        arBtn.parentNode.removeChild(arBtn);
      }
      renderer.xr.removeEventListener('sessionstart', handleSessionStart);
      hitTestSource?.cancel();
    };
  }, []);

  return <div ref={containerRef} />;
}
