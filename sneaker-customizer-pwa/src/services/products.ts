import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchProducts = async () => {
	const snap = await getDocs(collection(db, "products"));
	return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// const addProduct = async () => {
//   try {
//     const docRef = await addDoc(collection(db, "products"), {
//       name: "Everyday Sneakers",
//       price: 90,
//       image: "https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.appspot.com/o/images%2Feveryday_sneakers.png?alt=media&token=...",
//       description: "Versatile sneakers made for everyday wear and movement.",
//       modelUrl: "https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.appspot.com/o/models%2Feveryday_sneakers.glb?alt=media&token=...",
//       category: "Unisex",
//       stock: 100
//     });

//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
