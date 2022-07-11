import { FC } from 'react';
import { useUsersPosts } from '../lib/post';
import PostCard from './post-card';

const UsersPostList: FC<{
  userId: string;
}> = ({ userId }) => {
  const { posts } = useUsersPosts(userId);

  if (!posts) {
    return null;
  }

  return (
    <div>
      <h2>user posts</h2>
      <ul className="grid grid-cols-2 gap-4">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPostList;
