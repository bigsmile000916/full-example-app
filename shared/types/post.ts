export type Category = 'technology' | 'politics' | 'entertainment';

export type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
  authorId: string;
  likeCount: number;
  commentCount: number;
  coverUrl: string;
  category: Category;
};
