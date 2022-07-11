import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from './firebase/client';

export const uploadImage = async (
  path: string,
  image: string
): Promise<string> => {
  const imageRef = ref(storage, path);
  await uploadString(imageRef, image, 'data_url');
  return getDownloadURL(imageRef);
};
