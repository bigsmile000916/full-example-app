export type User = {
  id: string;
  createdAt: number;

  name: string;
  photoUrl: string;
  coverUrl: string;
  description: string;
  followerCount: number;
  followCount: number;
};

export type EditableUserField = Omit<User, 'id' | 'createdAt'>;
