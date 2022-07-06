import { faker } from '@faker-js/faker';
import { Post } from '@shared/types/post';
import { collection, doc, setDoc } from 'firebase/firestore';
import useSWR from 'swr/immutable';
import { db } from './firebase/client';

export const useTrendPosts = () => {
  const { data, error } = useSWR('/trend-posts', () => {
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
