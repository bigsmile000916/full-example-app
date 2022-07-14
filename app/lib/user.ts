import { faker } from '@faker-js/faker';
import { EditableUserField, User } from '@shared/types/user';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import useSWR from 'swr/immutable';
import { db } from './firebase/client';
import { uploadImage } from './storage';

export const useTrendUsers = () => {
  const { data, error } = useSWR<User[]>('/trend-users', () => {
    return [...new Array(5)].map((_) => {
      const user: User = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        photoUrl: faker.image.avatar(),
        coverUrl: faker.image.abstract(800, 400),
        description: faker.lorem.paragraph(),
        followerCount: faker.datatype.number(100),
        followCount: faker.datatype.number(100),
        createdAt: faker.date.past().getTime(),
      };

      return user;
    });
  });

  return {
    trendUsers: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUser = (id?: string) => {
  const { data, error } = useSWR<User>(id && `/users/${id}`, async () => {
    const user: User = {
      id: id!,
      name: faker.name.findName(),
      photoUrl: faker.image.avatar(),
      coverUrl: faker.image.abstract(800, 400),
      description: faker.lorem.paragraph(),
      followerCount: faker.datatype.number(100),
      followCount: faker.datatype.number(100),
      createdAt: faker.date.past().getTime(),
    };

    const ref = doc(db, `users/${id}`);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data() as User;
    } else {
      return user;
    }
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const uploadImages = async (id: string, data: Partial<User>) => {
  if (data.coverUrl?.match(/^data/)) {
    data.coverUrl = await uploadImage(`users/${id}/cover`, data.coverUrl);
  }

  if (data.photoUrl?.match(/^data/)) {
    data.photoUrl = await uploadImage(`users/${id}/avatar`, data.photoUrl);
  }
};

export const createUser = async (id: string, data: EditableUserField) => {
  const ref = doc(db, `users/${id}`);
  const user: User = {
    ...data,
    id,
    createdAt: Date.now(),
  };

  await uploadImages(id, data);

  return setDoc(ref, user);
};

export const updateUser = async (
  id: string,
  data: Partial<EditableUserField>
) => {
  const ref = doc(db, `users/${id}`);

  await uploadImages(id, data);

  return updateDoc(ref, data);
};
