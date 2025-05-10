// import {
//   useEffect,
//   useRef,
//   forwardRef,
//   useImperativeHandle,
//   useState,
// } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton';

// export type FootData = {
//   position: { x: number; y: number; z: number };
//   angle: number;
// };

// export type SceneHandle = {
//   updatePositions: (feet: { left: FootData; right: FootData }) => void;
// };

// type Props = {
//   useWebXR?: boolean;
// };

// const XRShoes = forwardRef<SceneHandle, Props>(({ useWebXR = false }, ref) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const leftShoeRef = useRef<THREE.Object3D>();
//   const rightShoeRef = useRef<THREE.Object3D>();
//   const [logs, setLogs] = useState<string[]>([]);

//   const log = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev.slice(-10), msg]); // keep last 10 logs
//   };

//   useImperativeHandle(ref, () => ({
//     updatePositions({ left, right }) {
//       if (leftShoeRef.current) {
//         leftShoeRef.current.position.set(
//           left.position.x * 2 - 1,
//           left.position.y * -2 + 1,
//           -1
//         );
//         leftShoeRef.current.rotation.y = -left.angle;
//         log(`👟 Left updated: ${JSON.stringify(left.position)}`);
//       }
//       if (rightShoeRef.current) {
//         rightShoeRef.current.position.set(
//           right.position.x * 2 - 1,
//           right.position.y * -2 + 1,
//           -1
//         );
//         rightShoeRef.current.rotation.y = -right.angle;
//         log(`👟 Right updated: ${JSON.stringify(right.position)}`);
//       }
//     },
//   }));

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       70,
//       window.innerWidth / window.innerHeight,
//       0.01,
//       20
//     );
//     camera.position.z = 2;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.xr.enabled = useWebXR;

//     if (
//       containerRef.current &&
//       !containerRef.current.contains(renderer.domElement)
//     ) {
//       containerRef.current.appendChild(renderer.domElement);
//     }

//     scene.add(new THREE.AmbientLight(0xffffff, 1));
//     const light = new THREE.DirectionalLight(0xffffff, 0.6);
//     light.position.set(1, 1, 1);
//     scene.add(light);

//     const loader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
//     loader.setDRACOLoader(dracoLoader);

//     const loadShoe = (
//       ref: React.MutableRefObject<THREE.Object3D | undefined>,
//       offsetX: number
//     ) => {
//       loader.load('/models/shoe-draco.glb', (gltf) => {
//         const shoe = gltf.scene;
//         shoe.scale.set(0.2, 0.2, 0.2);
//         shoe.position.x += offsetX;
//         ref.current = shoe;
//         scene.add(shoe);
//         log(`✅ Shoe loaded with offset ${offsetX}`);
//       });
//     };

//     loadShoe(leftShoeRef, -0.3);
//     loadShoe(rightShoeRef, 0.3);

//     if (useWebXR) {
//       const arBtn = ARButton.createButton(renderer, {
//         requiredFeatures: ['hit-test'],
//       });
//       if (!document.body.contains(arBtn)) {
//         document.body.appendChild(arBtn);
//         log('🟢 ARButton attached.');
//       }
//     }

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       renderer.setAnimationLoop(null);
//       renderer.dispose();
//       if (renderer.domElement.parentNode) {
//         renderer.domElement.parentNode.removeChild(renderer.domElement);
//       }
//     };
//   }, [useWebXR]);

//   return (
//     <>
//       <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
//       <LogOverlay logs={logs} />
//     </>
//   );
// });

// export default XRShoes;

// function LogOverlay({ logs }: { logs: string[] }) {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         background: 'rgba(0,0,0,0.6)',
//         color: 'white',
//         padding: '1rem',
//         maxHeight: '160px',
//         overflowY: 'auto',
//         zIndex: 1000,
//         fontSize: '0.8rem',
//         width: '100%',
//       }}
//     >
//       {logs.map((l, i) => (
//         <div key={i}>{l}</div>
//       ))}
//     </div>
//   );
// }
// XRScene.tsx (non-XR 3D test version + optional WebXR support)
import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export type FootData = {
  position: { x: number; y: number; z: number };
  angle: number;
};

export type SceneHandle = {
  updatePositions: (feet: { left: FootData; right: FootData }) => void;
};

type XRShoesProps = {
  useWebXR?: boolean;
};

function LogOverlay({ logs }: { logs: string[] }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '1rem',
        maxHeight: '200px',
        overflowY: 'auto',
        zIndex: 1000,
        fontSize: '0.8rem',
      }}
    >
      {logs.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}

const XRShoes = forwardRef<SceneHandle, XRShoesProps>(
  ({ useWebXR = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftShoeRef = useRef<THREE.Object3D>();
    const rightShoeRef = useRef<THREE.Object3D>();
    const [logs, setLogs] = useState<string[]>([]);
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    const log = (msg: string) => setLogs((prev) => [...prev.slice(-20), msg]);

    useImperativeHandle(ref, () => ({
      updatePositions({ left, right }) {
        if (leftShoeRef.current) {
          leftShoeRef.current.position.set(
            left.position.x * 2 - 1,
            left.position.y * -2 + 1,
            -1
          );
          leftShoeRef.current.rotation.y = -left.angle;
        }
        if (rightShoeRef.current) {
          rightShoeRef.current.position.set(
            right.position.x * 2 - 1,
            right.position.y * -2 + 1,
            -1
          );
          rightShoeRef.current.rotation.y = -right.angle;
        }
      },
    }));

    useEffect(() => {
      const scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
      );
      camera.position.z = 2;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = useWebXR;

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
          log(`👟 Shoe loaded with offset ${offsetX}`);
        });
      };

      loadShoe(leftShoeRef, -0.3);
      loadShoe(rightShoeRef, 0.3);

      if (useWebXR && navigator.xr) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
          if (supported) {
            document.body.appendChild(
              ARButton.createButton(renderer, {
                requiredFeatures: ['hit-test'],
              })
            );
            log('✅ WebXR AR session supported');
          } else {
            log('❌ WebXR immersive-ar not supported');
          }
        });

        renderer.xr.addEventListener('sessionstart', () =>
          log('🚀 XR session started')
        );
        renderer.xr.addEventListener('sessionend', () =>
          log('🛑 XR session ended')
        );
      }

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        renderer.setAnimationLoop(null);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }, [useWebXR]);

    return (
      <>
        <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
        <LogOverlay logs={logs} />
      </>
    );
  }
);

export default XRShoes;
