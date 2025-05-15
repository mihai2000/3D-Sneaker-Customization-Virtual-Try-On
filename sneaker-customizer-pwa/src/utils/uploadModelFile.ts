import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const uploadModelFile = async (): Promise<{
  url: string;
  path: string;
}> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const storage = getStorage();
  const blob = await fetch("/models/shoe-draco.glb").then((res) => res.blob());

  const filePath = `models/${user.uid}/${Date.now()}_shoe.glb`; // ✅ Match rules
  const modelRef = ref(storage, filePath);

  await uploadBytes(modelRef, blob);
  const url = await getDownloadURL(modelRef);

  return { url, path: filePath };
};
