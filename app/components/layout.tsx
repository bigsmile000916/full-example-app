import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import Header from './header';
import SideNav from './side-nav';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
    };

    router.events.on('routeChangeComplete', handleClose);

    return () => {
      router.events.off('routeChangeComplete', handleClose);
    };
  }, []);

  return (
    <div>
      <div className="hidden lg:block w-80 fixed inset-y-0">
        <SideNav open={open} onClose={() => setOpen(false)} />
      </div>
      <div className="lg:pl-80 pt-6 pb-10">
        <div className="mb-6">
          <Header handleMenuClick={() => setOpen(true)} />
        </div>
        <main className="relative">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
