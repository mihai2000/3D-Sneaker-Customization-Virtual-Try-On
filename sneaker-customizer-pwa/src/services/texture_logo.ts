import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from './firebase';

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
