import { FC, ReactNode } from 'react';
import Header from './header';
import SideNav from './side-nav';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="w-80">
        <SideNav />
      </div>
      <div className="flex-1 overflow-hidden pt-6 pb-10">
        <div className="mb-6">
          <Header />
        </div>
        <main className="relative">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
