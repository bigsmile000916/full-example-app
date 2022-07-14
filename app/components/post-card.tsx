import { ChatIcon, HeartIcon } from '@heroicons/react/outline';
import { Post } from '@shared/types/post';
import { formatDistanceToNowStrict } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import React from 'react';
import { FC } from 'react';
import { useUser } from '../lib/user';
import Avatar from './avatar';

type Props = {
  post: Post;
};

const PostCard: FC<Props> = ({ post }) => {
  const { user } = useUser(post?.authorId);

  if (!post || !user) {
    return null;
  }

  return (
    <div className="rounded-lg bg-slate-800/80 p-4 relative">
      <Link href={`/posts/${post.id}`}>
        <a className="absolute block inset-0" />
      </Link>
      {post.coverUrl && (
        <div className={`rounded-lg overflow-hidden aspect-video`}>
          <img
            src={post.coverUrl}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
      )}
      <div className="flex mt-3">
        <Avatar src={user.photoUrl} />
        <div className="flex-1 ml-4">
          <h2 className="text-slate-200 text-lg line-clamp-2">{post.title}</h2>
          <p className="text-slate-500">
            <span>{user.name}</span>
            <span className="ml-3">
              {formatDistanceToNowStrict(post.createdAt!, {
                addSuffix: true,
                locale: ja,
              })}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-1">
        <button className="relative z-10 p-2 flex items-center space-x-2 hover:bg-slate-700 hover:text-blue-500 rounded-full text-slate-500">
          <HeartIcon className="w-5 h-5" />
          <span>{post.likeCount}</span>
        </button>
        <button className="relative z-10 p-2 flex items-center space-x-2 hover:bg-slate-700 hover:text-blue-500 rounded-full text-slate-500">
          <ChatIcon className="w-5 h-5" />
          <span>{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
