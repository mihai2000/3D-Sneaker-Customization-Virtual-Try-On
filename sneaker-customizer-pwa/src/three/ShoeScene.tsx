// import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// type FootData = {
// 	position: { x: number; y: number; z: number };
// 	angle: number;
// };

// type SceneHandle = {
// 	updatePositions: (feet: { left: FootData; right: FootData }) => void;
// };

// export default forwardRef<SceneHandle>(function ShoeScene(_, ref) {
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const leftShoeRef = useRef<THREE.Object3D>();
// 	const rightShoeRef = useRef<THREE.Object3D>();

// 	useImperativeHandle(ref, () => ({
// 		updatePositions({ left, right }) {
// 			if (leftShoeRef.current) {
// 				leftShoeRef.current.position.set(
// 					left.position.x,
// 					left.position.y,
// 					left.position.z
// 				);
// 				leftShoeRef.current.rotation.y = -left.angle; // Invert for Three.js Y axis
// 			}

// 			if (rightShoeRef.current) {
// 				rightShoeRef.current.position.set(
// 					right.position.x,
// 					right.position.y,
// 					right.position.z
// 				);
// 				rightShoeRef.current.rotation.y = -right.angle;
// 			}
// 		},
// 	}));

// 	useEffect(() => {
// 		const container = containerRef.current;
// 		const scene = new THREE.Scene();
// 		const camera = new THREE.PerspectiveCamera(
// 			75,
// 			window.innerWidth / window.innerHeight,
// 			0.1,
// 			1000
// 		);
// 		camera.position.z = 1.5;

// 		const renderer = new THREE.WebGLRenderer({ alpha: true });
// 		renderer.setSize(window.innerWidth, window.innerHeight);
// 		container?.appendChild(renderer.domElement);

// 		const light = new THREE.DirectionalLight(0xffffff, 1);
// 		light.position.set(1, 1, 1).normalize();
// 		scene.add(light);

// 		const loader = new GLTFLoader();
// 		const dracoLoader = new DRACOLoader();
// 		dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
// 		loader.setDRACOLoader(dracoLoader);

// 		const loadShoe = (
// 			ref: React.MutableRefObject<THREE.Object3D | undefined>,
// 			offsetX = 0
// 		) => {
// 			loader.load(
// 				"/models/shoe-draco.glb",
// 				(gltf) => {
// 					const shoe = gltf.scene;
// 					shoe.scale.set(0.1, 0.1, 0.1);
// 					shoe.position.x += offsetX;
// 					ref.current = shoe;
// 					scene.add(shoe);
// 				},
// 				undefined,
// 				(err) => console.error("Error loading model:", err)
// 			);
// 		};

// 		loadShoe(leftShoeRef, -0.05);
// 		loadShoe(rightShoeRef, 0.05);

// 		const animate = () => {
// 			requestAnimationFrame(animate);
// 			renderer.render(scene, camera);
// 		};
// 		animate();

// 		return () => {
// 			renderer.dispose();
// 			container?.removeChild(renderer.domElement);
// 		};
// 	}, []);

// 	return (
// 		<div
// 			ref={containerRef}
// 			style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
// 		/>
// 	);
// });
