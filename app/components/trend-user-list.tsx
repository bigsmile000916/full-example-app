import React from 'react';
import { useTrendUsers } from '../lib/user';
import Avatar from './avatar';

const TrendUserList = () => {
  const { trendUsers, isLoading } = useTrendUsers();

  if (!trendUsers?.length) {
    return null;
  }

  return (
    <ul className="space-y-6">
      {trendUsers?.map((user) => (
        <li
          key={user.id}
          className="flex items-center text-slate-200 space-x-3"
        >
          <Avatar src={user.photoUrl} size="md" />
          <div className="flex-1 leading-none overflow-hidden">
            <p className="mb-1 font-medium truncate">{user.name}</p>
            <p className="text-slate-400 text-sm truncate">
              @{user.handleName}
            </p>
          </div>
          <button className="rounded-full text-sm bg-blue-500 text-white px-5 py-2">
            Follow
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TrendUserList;
