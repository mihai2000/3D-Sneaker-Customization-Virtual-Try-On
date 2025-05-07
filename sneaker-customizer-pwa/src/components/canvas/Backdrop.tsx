import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import state from "../../store";

type AccumulativeContextRef = {
	lights: Map<any, any>;
	temporal: boolean;
	frames: number;
	blend: number;
	count: number;
	getMesh: () => THREE.Mesh<
		THREE.PlaneGeometry,
		THREE.ShaderMaterial & {
			map: THREE.Texture;
			color?: THREE.Color;
			alphaTest?: number;
			blend?: number;
		}
	>;
	reset: () => void;
	update: (frames?: number) => void;
};

const Backdrop: React.FC = () => {
	const shadows = useRef<AccumulativeContextRef>(null!);

	const snap = useSnapshot(state);

	useFrame((_, delta) => {
		const mesh = shadows.current?.getMesh?.();
		if (mesh && mesh.material instanceof THREE.MeshStandardMaterial) {
			easing.dampC(
				mesh.material.color,
				new THREE.Color(snap.color),
				0.25,
				delta
			);
		}
	});

	return (
		<AccumulativeShadows
			ref={shadows}
			frames={60}
			alphaTest={0.85}
			scale={100}
			rotation={[Math.PI / 2, 0, 0]}
			position={[0, 0, -0.5]}
		>
			<RandomizedLight
				amount={4}
				radius={9}
				intensity={0.5}
				ambient={0.25}
				position={[5, 15, -10]}
			/>
			<RandomizedLight
				amount={4}
				radius={5}
				intensity={0.25}
				ambient={0.55}
				position={[-5, -10, -9]}
			/>
		</AccumulativeShadows>
	);
};

export default Backdrop;
