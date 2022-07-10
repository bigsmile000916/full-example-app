import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/auth';
import Button from './button';
import Notification from './notification';
import SearchBox from './search-box';
import UserMenu from './user-menu';

const Header = () => {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex items-center space-x-4 relative z-10 container">
      <SearchBox />
      <span className="flex-1"></span>
      {user && (
        <>
          <Button href="/new">投稿</Button>
          <Notification />
          <UserMenu />
        </>
      )}
      {!isLoading && !user && <Button href="/signin">ログイン</Button>}
    </div>
  );
};

export default Header;
