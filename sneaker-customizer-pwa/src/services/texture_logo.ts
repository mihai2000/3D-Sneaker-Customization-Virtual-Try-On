import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from './firebase';
import { getAuth } from 'firebase/auth';

export const uploadUserTexture = async (file: File): Promise<string> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not authenticated');

  const fileRef = ref(storage, `user-textures/${user.uid}/${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const uploadUserLogo = async (
  file: File,
  colorFolder: 'black' | 'white' | 'colored'
): Promise<void> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not authenticated');

  const fileRef = ref(
    storage,
    `user-logos/${user.uid}/${colorFolder}/${file.name}`
  );
  await uploadBytes(fileRef, file);
};

export const getUserTextures = async (): Promise<
  { name: string; url: string }[]
> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not authenticated');

  const folderRef = ref(storage, `user-textures/${user.uid}/`);
  const list = await listAll(folderRef);

  return Promise.all(
    list.items.map(async (item) => ({
      name: item.name,
      url: await getDownloadURL(item),
    }))
  );
};

export const getUserLogos = async (): Promise<{
  [color: string]: { name: string; url: string }[];
}> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not authenticated');

  const folders = ['black', 'white', 'colored'];
  const result: { [color: string]: { name: string; url: string }[] } = {};

  for (const folder of folders) {
    const folderRef = ref(storage, `user-logos/${user.uid}/${folder}`);
    try {
      const list = await listAll(folderRef);
      result[folder] = await Promise.all(
        list.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item),
        }))
      );
    } catch (err) {
      console.error(`Failed to list ${folder} user logos`, err);
      result[folder] = [];
    }
  }

  return result;
};

export const deleteUserTexture = async (filename: string): Promise<void> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not authenticated');

  const fileRef = ref(storage, `user-textures/${user.uid}/${filename}`);
  await deleteObject(fileRef);
};

export const deleteUserLogo = async (
  filename: string,
  folder: 'black' | 'white' | 'colored'
): Promise<void> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not authenticated');

  const fileRef = ref(storage, `user-logos/${user.uid}/${folder}/${filename}`);
  await deleteObject(fileRef);
};

export const getTextureImages = async (): Promise<
  { name: string; url: string }[]
> => {
  try {
    const listRef = ref(storage, 'textures/');
    const res = await listAll(listRef);
    const data = await Promise.all(
      res.items.map(async (itemRef) => ({
        name: itemRef.name,
        url: await getDownloadURL(itemRef),
      }))
    );
    return data;
  } catch (error) {
    console.error('❌ Error fetching texture images:', error);
    return [];
  }
};

const logoFolders = ['black', 'white', 'colored', 'default'];

export const getLogoImages = async (): Promise<{
  [color: string]: { name: string; url: string }[];
}> => {
  const result: { [color: string]: { name: string; url: string }[] } = {};

  for (const color of logoFolders) {
    try {
      const folderRef = ref(storage, `logos/${color}/`);
      const list = await listAll(folderRef);
      const items = await Promise.all(
        list.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item),
        }))
      );
      result[color] = items;
    } catch (error) {
      console.error(`❌ Error fetching ${color} logos:`, error);
      result[color] = [];
    }
  }

  return result;
};
