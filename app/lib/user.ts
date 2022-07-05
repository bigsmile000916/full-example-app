import { faker } from '@faker-js/faker';
import { User } from '@shared/types/user';
import { useRouter } from 'next/router';
import useSWR from 'swr/immutable';
import { useAuth } from '../context/auth';

export const useTrendUsers = () => {
  const { data, error } = useSWR<User[]>('/trend-users', () => {
    return [...new Array(5)].map((_) => {
      return {
        id: faker.datatype.uuid(),
        handleName: faker.internet.userName(),
        name: faker.name.findName(),
        photoUrl: faker.image.avatar(),
        description: faker.lorem.paragraph(),
        followerCount: faker.datatype.number(100),
        followCount: faker.datatype.number(100),
      };
    });
  });

  return {
    trendUsers: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUser = (id?: string) => {
  const { data, error } = useSWR<User>(id && `/users/${id}`, () => {
    return {
      id: id!,
      handleName: faker.internet.userName(),
      name: faker.name.findName(),
      photoUrl: faker.image.avatar(),
      description: faker.lorem.paragraph(),
      followerCount: faker.datatype.number(100),
      followCount: faker.datatype.number(100),
    };
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
