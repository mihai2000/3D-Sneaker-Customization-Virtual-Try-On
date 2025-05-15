import React, {
	useState,
	useEffect,
	useRef,
	forwardRef,
	useImperativeHandle,
} from "react";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import state, { ItemsType } from "../../store";

interface GLTFResult extends THREE.Object3D {
	nodes: { [key: string]: THREE.Mesh };
	materials: { [key: string]: THREE.Material };
}

interface ShoeProps {
	staticState?: {
		items?: ItemsType;
		isLogoTexture?: boolean;
		isFullTexture?: boolean;
		logoDecal?: string;
		fullDecal?: string;
	};
}

const Shoe = forwardRef<THREE.Group, ShoeProps>(
	({ staticState, ...props }, ref) => {
		const snap = useSnapshot(state);
		const usedState = staticState ?? snap;
		const groupRef = useRef<THREE.Group>(null);
		useImperativeHandle(ref, () => groupRef.current!);

		const { nodes, materials } = useGLTF(
			"/models/shoe-draco.glb"
		) as unknown as GLTFResult;

		const logoTexture = useTexture(usedState.logoDecal || "");
		const fullTexture = useTexture(usedState.fullDecal || "");

		const [hovered, setHovered] = useState<string | null>(null);

		useEffect(() => {
			if (snap.intro || staticState) {
				document.body.style.cursor = "auto";
				return;
			}
			if (hovered !== null) {
				const color = snap.items[hovered as keyof ItemsType];
				const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${color}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
				const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;

				document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`;
				return () => {
					document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`;
				};
			}
		}, [hovered, snap.intro, snap.items, staticState]);

		const handlePointerMaterialName = (object: THREE.Object3D) => {
			const mesh = object as THREE.Mesh;
			const material = mesh.material;
			return Array.isArray(material)
				? (material[0]?.name ?? "")
				: material.name;
		};

		const isInteractive = !staticState;

		return (
			<group
				{...props}
				dispose={null}
				ref={groupRef}
				onPointerOver={
					isInteractive
						? (e) => {
								e.stopPropagation();
								setHovered(handlePointerMaterialName(e.object));
							}
						: undefined
				}
				onPointerOut={
					isInteractive
						? (e) => {
								if (e.intersections.length === 0) setHovered(null);
							}
						: undefined
				}
				onPointerMissed={
					isInteractive
						? () => {
								state.current = null;
							}
						: undefined
				}
				onClick={
					isInteractive
						? (e) => {
								e.stopPropagation();
								const name = handlePointerMaterialName(e.object);
								state.current =
									name in snap.items ? (name as keyof ItemsType) : null;
							}
						: undefined
				}
			>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe.geometry}
					material={materials.laces}
					material-color={usedState.items?.laces || "#fff"}
				/>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_1.geometry}
					material={materials.mesh}
					material-color={usedState.items?.mesh || "#fff"}
				>
					{usedState.isFullTexture && (
						<Decal
							position={[-0.7, -0.25, 0]}
							rotation={[0, 0, 0]}
							scale={1}
							map={fullTexture}
							depthTest={false}
						/>
					)}
					{usedState.isLogoTexture && (
						<Decal
							position={[-0.5, -0.1, 0.15]}
							rotation={[0, 0, 0]}
							scale={0.4}
							map={logoTexture}
							depthTest={false}
						/>
					)}
				</mesh>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_2.geometry}
					material={materials.caps}
					material-color={usedState.items?.caps || "#fff"}
				/>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_3.geometry}
					material={materials.inner}
					material-color={usedState.items?.inner || "#fff"}
				/>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_4.geometry}
					material={materials.sole}
					material-color={usedState.items?.sole || "#fff"}
				/>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_5.geometry}
					material={materials.stripes}
					material-color={usedState.items?.stripes || "#fff"}
				/>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_6.geometry}
					material={materials.band}
					material-color={usedState.items?.band || "#fff"}
				/>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.shoe_7.geometry}
					material={materials.patch}
					material-color={usedState.items?.patch || "#fff"}
				/>
			</group>
		);
	}
);

export default Shoe;
