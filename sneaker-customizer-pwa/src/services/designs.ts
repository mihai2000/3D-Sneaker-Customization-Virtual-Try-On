import { getFirestore, collection, getDocs } from "firebase/firestore";

export const fetchSavedDesigns = async (user: { uid: string }) => {
	const db = getFirestore();
	const designsRef = collection(db, "users", user.uid, "designs");
	const snapshot = await getDocs(designsRef);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
