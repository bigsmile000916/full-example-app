import { MenuIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { useAuth } from '../context/auth';
import Button from './button';
import Logo from './logo';
import SearchBox from './search-box';
import UserMenu from './user-menu';

const Header: FC<{
  handleMenuClick: VoidFunction;
}> = ({ handleMenuClick }) => {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex items-center relative z-10 container">
      <button className="md:hidden" onClick={handleMenuClick}>
        <MenuIcon className="w-5 h-5" />
      </button>
      <div className="md:hidden w-32 ml-2">
        <Logo />
      </div>
      <div className="hidden md:block">
        <SearchBox />
      </div>
      <span className="flex-1"></span>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <Button href="/new">投稿</Button>
            <UserMenu />
          </>
        )}
        {!isLoading && !user && <Button href="/signin">ログイン</Button>}
      </div>
    </div>
  );
};

export default Header;
