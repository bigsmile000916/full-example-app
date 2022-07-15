import { ChatIcon, HeartIcon } from '@heroicons/react/outline';
import { Post } from '@shared/types/post';
import { formatDistanceToNowStrict } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import React, { SVGProps } from 'react';
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
    <div className="rounded-lg dark:bg-slate-800 bg-slate-200 p-4 relative">
      <Link href={`/posts/${post.id}`}>
        <a className="absolute block inset-0" />
      </Link>
      {post.coverUrl && (
        <div className="rounded-lg overflow-hidden aspect-video mb-3">
          <img
            src={post.coverUrl}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
      )}
      <div className="flex">
        <Avatar src={user.photoUrl} />
        <div className="flex-1 ml-4">
          <h2 className="text-lg line-clamp-2">{post.title}</h2>
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
        <CardButton Icon={HeartIcon} value={post.likeCount} />
        <CardButton Icon={ChatIcon} value={post.commentCount} />
      </div>
    </div>
  );
};

export default PostCard;

const CardButton: FC<{
  value: number;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}> = ({ value, Icon }) => {
  return (
    <button className="relative z-10 px-2 py-1.5 flex items-center space-x-2 hover:bg-slate-300 hover:dark:bg-slate-700 hover:text-blue-500 rounded-full text-slate-500">
      <Icon className="w-5 h-5" />
      <span>{value}</span>
    </button>
  );
};
