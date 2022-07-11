export type User = {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  followerCount: number;
  followCount: number;
  createdAt: number;
  coverUrl: string;
};

export type EditableUserField = Omit<User, 'id' | 'createdAt'>;
