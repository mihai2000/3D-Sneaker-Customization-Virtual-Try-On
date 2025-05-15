import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadModelFile = async (): Promise<{
	url: string;
	path: string;
}> => {
	const storage = getStorage();
	const blob = await fetch("/models/shoe-draco.glb").then((res) => res.blob()); // or dynamically generated blob
	const filePath = `models/${Date.now()}_shoe.glb`;
	const modelRef = ref(storage, filePath);
	await uploadBytes(modelRef, blob);
	const url = await getDownloadURL(modelRef);

	return { url, path: filePath };
};
