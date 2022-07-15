import { faker } from '@faker-js/faker';
import { Category, Post } from '@shared/types/post';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import useSWR from 'swr/immutable';
import { db } from './firebase/client';
import { uploadImage } from './storage';

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

export const createPost = async (
  data: Pick<Post, 'title' | 'body' | 'authorId' | 'coverUrl' | 'category'>
) => {
  const ref = doc(collection(db, 'posts'));
  const id = ref.id;

  if (data.coverUrl?.match(/^data/)) {
    data.coverUrl = await uploadImage(
      `users/${data.authorId}/posts/${id}`,
      data.coverUrl
    );
  }

  const post: Post = {
    id,
    createdAt: Date.now(),
    updatedAt: null,
    likeCount: 0,
    commentCount: 0,
    ...data,
  };

  return setDoc(ref, post);
};

export const updatePost = async (id: string, data: Partial<Post>) => {
  const ref = doc(db, `posts/${id}`);

  if (data.coverUrl?.match(/^data/)) {
    data.coverUrl = await uploadImage(
      `users/${data.authorId}/posts/${id}`,
      data.coverUrl
    );
  }

  const post: Partial<Post> = {
    updatedAt: Date.now(),
    ...data,
  };

  return updateDoc(ref, post);
};

export const CategoryOptions: {
  value: Category;
  label: string;
}[] = [
  {
    value: 'technology',
    label: 'テクノロジー',
  },
  {
    value: 'entertainment',
    label: 'エンターテイメント',
  },
  {
    value: 'politics',
    label: '政治',
  },
];

export const deletePost = (id: string) => {
  const ref = doc(db, `/posts/${id}`);
  return deleteDoc(ref).then(() => {
    toast.success('記事を削除しました');
  });
};

export const getCategoryLabel = (value: string) => {
  return CategoryOptions.find((item) => item.value === value)?.label || '';
};

export const getPost = async (id: string): Promise<Post> => {
  const ref = doc(db, `posts/${id}`);
  const snap = await getDoc(ref);

  return snap.data() as Post;
};
