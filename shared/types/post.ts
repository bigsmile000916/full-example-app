export type Category = 'technology' | 'politics' | 'entertainment';

export type Post = {
  id: string;
  createdAt: number;
  authorId: string;

  title: string;
  body: string;
  updatedAt: number | null;
  likeCount: number;
  commentCount: number;
  coverUrl: string;
  category: Category;
};
