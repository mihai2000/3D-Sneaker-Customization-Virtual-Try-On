import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export default function XRScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    const showMessage = (text: string, timeout = 3000) => {
      const el = document.getElementById('ar-message');
      if (el) {
        el.innerText = text;
        el.style.display = 'block';
        setTimeout(() => {
          el.style.display = 'none';
        }, timeout);
      }
    };

    if (containerRef.current && !containerRef.current.contains(renderer.domElement)) {
      containerRef.current.appendChild(renderer.domElement);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    const arBtn = ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] });
    if (!document.body.contains(arBtn)) document.body.appendChild(arBtn);

    let hitTestSource: XRHitTestSource | null = null;
    let localSpace: XRReferenceSpace | null = null;
    const lastHitMatrix = new THREE.Matrix4();
    let shoe: THREE.Object3D | null = null;
    let controller: THREE.Group;

    const onSelect = () => {
      if (!shoe) {
        loader.load(
          '/models/nike-air-jordan.glb',
          (gltf) => {
            shoe = gltf.scene;
            shoe.scale.set(0.2, 0.2, 0.2);
            shoe.position.setFromMatrixPosition(lastHitMatrix);
            scene.add(shoe);
            console.log('👟 Shoe added');
            showMessage('👟 Shoe added to the scene!');
          },
          undefined,
          (error) => {
            console.error('❌ Model load error:', error);
            showMessage('❌ Failed to load shoe model.');
          }
        );
      } else {
        shoe.position.setFromMatrixPosition(lastHitMatrix);
        console.log('📍 Shoe moved');
        showMessage('📍 Shoe position updated.');
      }
    };

    const handleSessionStart = async () => {
      const session = renderer.xr.getSession();
      if (!session) return;

      try {
        localSpace = await session.requestReferenceSpace('viewer');
        hitTestSource = (await session.requestHitTestSource?.({ space: localSpace })) ?? null;

        controller = renderer.xr.getController(0);
        (controller as any).addEventListener('select', onSelect as EventListener);
        scene.add(controller);
        console.log('🟢 Hit test initialized.');
        showMessage('🟢 Hit test initialized.');
      } catch (err) {
        console.warn('⚠️ Hit test setup failed:', err);
        showMessage('⚠️ Hit test setup failed.');
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
      renderer.setAnimationLoop(null);
      renderer.forceContextLoss();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      if (arBtn && arBtn.parentNode) {
        arBtn.parentNode.removeChild(arBtn);
      }

      if (controller) {
        (controller as any).removeEventListener('select', onSelect as EventListener);
        scene.remove(controller);
      }

      hitTestSource?.cancel();
      renderer.xr.removeEventListener('sessionstart', handleSessionStart);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div
        id="ar-message"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '12px',
          fontSize: '1rem',
          zIndex: 999,
          display: 'none',
        }}
      >
        AR Message
      </div>
    </div>
  );
}
