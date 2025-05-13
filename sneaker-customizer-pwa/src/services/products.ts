import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchProducts = async () => {
	const snap = await getDocs(collection(db, "products"));
	return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
