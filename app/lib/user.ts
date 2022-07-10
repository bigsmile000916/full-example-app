import { faker } from '@faker-js/faker';
import { EditableUserField, User } from '@shared/types/user';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import useSWR from 'swr/immutable';
import { db } from './firebase/client';

export const useTrendUsers = () => {
  const { data, error } = useSWR<User[]>('/trend-users', () => {
    return [...new Array(5)].map((_) => {
      const user: User = {
        id: faker.datatype.uuid(),
        handleName: faker.internet.userName(),
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
      handleName: faker.internet.userName(),
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

    return (snap.data() as User) || user;
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const createUser = (id: string, data: EditableUserField) => {
  const ref = doc(db, `users/${id}`);
  const user: User = {
    ...data,
    id,
    createdAt: Date.now(),
  };
  return setDoc(ref, user);
};

export const updateUser = (id: string, data: Partial<EditableUserField>) => {
  const ref = doc(db, `users/${id}`);
  return updateDoc(ref, data);
};
