import React, { FC, ReactNode } from 'react';
import Header from './header';
import SearchBox from './search-box';
import SideNav from './side-nav';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="w-80">
        <SideNav />
      </div>
      <div className="flex-1 container py-8 space-y-6">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
