import { faker } from '@faker-js/faker';
import { Post } from '@shared/types/post';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import useSWR from 'swr/immutable';
import { db } from './firebase/client';

export const useTrendPosts = () => {
  const { data, error } = useSWR<Post[]>('/trend-posts', () => {
    return [...new Array(4)].map((_) => {
      return {
        id: faker.datatype.uuid(),
        title: faker.lorem.lines(2),
        coverUrl: faker.image.abstract(800, 450, true),
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        authorId: faker.datatype.uuid(),
        likeCount: faker.datatype.number(1000),
        commentCount: faker.datatype.number(100),
      } as Post;
    });
  });

  return {
    trendPosts: data,
    isLoading: !data && !error,
    error,
  };
};

export const useUsersPosts = (userId?: string) => {
  const { data, error } = useSWR<Post[]>(userId && '/usersPosts', async () => {
    const ref = query(
      collection(db, 'posts'),
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const result = await getDocs(ref)
      .then((snap) => snap.docs.map((doc) => doc.data() as Post))
      .catch((e) => console.log(e));

    return result || [];
  });

  return {
    posts: data,
    isLoading: !data && !error,
    error,
  };
};

export const createPost = (
  data: Pick<Post, 'title' | 'body' | 'authorId' | 'coverUrl'>
) => {
  const ref = doc(collection(db, 'posts'));
  const post: Post = {
    id: ref.id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    likeCount: 0,
    commentCount: 0,
    ...data,
  };

  return setDoc(ref, post);
};
