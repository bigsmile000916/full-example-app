import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import { useTrendUsers } from '../lib/user';
import Avatar from './avatar';

const UserLink: FC<{
  id: string;
  children: ReactNode;
}> = ({ id, children }) => {
  return (
    <Link href={`/users/${id}`}>
      <a>{children}</a>
    </Link>
  );
};

const TrendUserList = () => {
  const { trendUsers, isLoading } = useTrendUsers();

  if (!trendUsers?.length) {
    return null;
  }

  return (
    <ul className="space-y-6">
      {trendUsers?.map((user) => (
        <li key={user.id} className="flex items-center space-x-3">
          <UserLink id={user.id}>
            <Avatar src={user.photoUrl} size="md" />
          </UserLink>
          <div className="flex-1 leading-none overflow-hidden">
            <p className="mb-1 font-medium truncate dark:text-slate-200">
              <UserLink id={user.id}>{user.name}</UserLink>
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-sm truncate">
              <UserLink id={user.id}>{user.name}</UserLink>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TrendUserList;
