import React from 'react';
import Notification from './notification';
import SearchBox from './search-box';
import UserMenu from './user-menu';

const Header = () => {
  return (
    <div className="flex items-center space-x-4 relative z-10">
      <SearchBox />
      <span className="flex-1"></span>
      <Notification />
      <UserMenu />
    </div>
  );
};

export default Header;
