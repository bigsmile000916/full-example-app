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
          className="flex items-center text-slate-200 space-x-4"
        >
          <Avatar src={user.photoUrl} />
          <div className="flex-1 leading-none">
            <p className="mb-1 font-medium">{user.name}</p>
            <p className="text-slate-400 text-sm">@{user.handleName}</p>
          </div>
          <button className="rounded-full w-28 text-sm bg-blue-500 text-white px-3 py-2">
            Follow
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TrendUserList;