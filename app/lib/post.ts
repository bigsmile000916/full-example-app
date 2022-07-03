import { faker } from '@faker-js/faker';
import { Post } from '@shared/types/post';
import useSWR from 'swr/immutable';

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
