import { faker } from '@faker-js/faker';
import { Post } from '@shared/types/post';

export const mockTrendPosts: Post[] = [...new Array(4)].map((_) => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.lines(2),
    coverUrl: faker.image.abstract(800, 450, true),
    createdAt: faker.date.past().getTime(),
    updatedAt: faker.date.past().getTime(),
    authorId: faker.datatype.uuid(),
    likeCount: faker.datatype.number(1000),
    commentCount: faker.datatype.number(100),
  };
});
