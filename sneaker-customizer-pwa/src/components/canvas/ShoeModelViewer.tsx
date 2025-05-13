import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { X, Maximize2, Minimize2, RotateCw } from "lucide-react";
import "./ShoeModelViewer.scss";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	modelUrl: string;
	shoeName: string;
}
const ShoeModelViewer: React.FC<Props> = ({
	isOpen,
	onClose,
	modelUrl,
	shoeName,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isOpen || !containerRef.current) return;

		const container = containerRef.current;
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);

		const camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5);

		scene.add(ambientLight, directionalLight);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		const loader = new GLTFLoader();
		loader.load(
			modelUrl,
			(gltf) => {
				scene.add(gltf.scene);
				setIsLoading(false);

				const box = new THREE.Box3().setFromObject(gltf.scene);
				const center = box.getCenter(new THREE.Vector3());
				gltf.scene.position.sub(center);

				const size = box.getSize(new THREE.Vector3());
				const scale = 3 / Math.max(size.x, size.y, size.z);
				gltf.scene.scale.multiplyScalar(scale);
			},
			undefined,
			(err) => {
				console.error("Model load error:", err);
				setIsLoading(false);
			}
		);

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		return () => {
			if (container.firstChild) container.removeChild(container.firstChild);
			renderer.dispose();
		};
	}, [isOpen, modelUrl]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="modal-overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={`modal-container ${isFullscreen ? "fullscreen" : ""}`}
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
					>
						<div className="modal-header">
							<h2>{shoeName}</h2>
							<div className="modal-controls">
								<button onClick={() => setIsFullscreen(!isFullscreen)}>
									{isFullscreen ? <Minimize2 /> : <Maximize2 />}
								</button>
								<button onClick={onClose}>
									<X />
								</button>
							</div>
						</div>

						{isLoading && (
							<div className="loading-overlay">
								<RotateCw className="spinner" />
								<span>Loading model...</span>
							</div>
						)}

						<div ref={containerRef} className="viewer-container" />

						<div className="modal-footer">
							<p>
								Click and drag to rotate • Scroll to zoom • Right click to pan
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ShoeModelViewer;
