import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";

export const uploadPreviewImage = async (): Promise<{ url: string; path: string } | null> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;

  const canvas = document.querySelector("canvas");
  if (!canvas) return null;

  const dataUrl = canvas.toDataURL("image/png");
  const generatedId = uuid();
  const path = `previews/${user.uid}/${generatedId}.png`;

  const storage = getStorage();
  const imageRef = ref(storage, path);
  await uploadString(imageRef, dataUrl, "data_url");

  const url = await getDownloadURL(imageRef);
  return { url, path };
};
