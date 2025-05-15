import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import * as THREE from "three";

export const uploadModelFile = async (
	blob: Blob
): Promise<{ url: string; path: string }> => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (!user) throw new Error("User not authenticated");

	const storage = getStorage();
	const filePath = `models/${user.uid}/${Date.now()}_shoe.glb`;
	const modelRef = ref(storage, filePath);

	await uploadBytes(modelRef, blob);
	const url = await getDownloadURL(modelRef);

	return { url, path: filePath };
};

export const exportModifiedModel = (group: THREE.Object3D): Promise<Blob> => {
	const exporter = new GLTFExporter();

	return new Promise((resolve, reject) => {
		exporter.parse(
			group,
			(result) => {
				if (result instanceof ArrayBuffer) {
					const blob = new Blob([result], { type: "model/gltf-binary" });
					resolve(blob);
				} else {
					reject("Expected GLB (ArrayBuffer), but got JSON");
				}
			},
			(error) => reject(error),
			{ binary: true }
		);
	});
};
