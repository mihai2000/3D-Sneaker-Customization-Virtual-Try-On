import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import state from "../store";
import { uploadPreviewImage } from "./uploadPreviewImage";

export const saveDesignToFirestore = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) throw new Error("User not authenticated");

	const db = getFirestore();
	const preview = await uploadPreviewImage();
	if (!preview) throw new Error("Preview upload failed");

	const design = {
		userId: user.uid,
		items: state.items,
		logoDecal: state.logoDecal,
		fullDecal: state.fullDecal,
		isLogoTexture: state.isLogoTexture,
		isFullTexture: state.isFullTexture,
		previewImageUrl: preview.url,
		previewImagePath: preview.path,
		createdAt: serverTimestamp(),
	};

	const ref = collection(db, "users", user.uid, "designs");
	await addDoc(ref, design);
};
