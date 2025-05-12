import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const fetchUserProfile = async (userId: string) => {
	const docRef = doc(db, "users", userId);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? docSnap.data() : { name: "", email: "" };
};

// export const updateUserProfile = async (userId: string, data: { name: string; email: string }) => {
//   await setDoc(doc(db, 'users', userId), data, { merge: true });
// };
export const updateUserProfile = async (
	userId: string,
	updates: { name?: string; email?: string }
) => {
	const ref = doc(db, "users", userId);
	await updateDoc(ref, updates);
};
