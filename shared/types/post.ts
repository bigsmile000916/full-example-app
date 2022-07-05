export type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
  coverUrl: string;
  authorId: string;
  likeCount: number;
  commentCount: number;
};
