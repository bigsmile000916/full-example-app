import Link from 'next/link';

import { Dialog } from '@headlessui/react';
import {
  HomeIcon,
  LogoutIcon,
  RssIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { FC } from 'react';
import { useAuth } from '../context/auth';
import { logout } from '../lib/auth';
import Logo from './logo';
import SideNavItem from './side-nav-item';

const subItems = [
  {
    label: 'サービスについて',
    href: '/about',
  },
  {
    label: '利用規約',
    href: '/terms',
  },
  {
    label: 'プライバシーポリシー',
    href: '/privacy',
  },
  {
    label: 'お問い合わせ',
    href: '/contact',
  },
];

const SideMenu = () => {
  const { user } = useAuth();

  const mainItems = [
    {
      icon: HomeIcon,
      label: 'ホーム',
      href: '/',
    },
    {
      icon: RssIcon,
      label: '最新の投稿',
      href: '/news',
    },
    {
      icon: SearchIcon,
      label: '探す',
      href: '/search',
    },
    {
      icon: UserIcon,
      label: 'プロフィール',
      href: `/users/${user?.id}`,
    },
  ];

  return (
    <div className="dark:bg-slate-800 bg-slate-200 shadow p-12 h-full overflow-auto">
      <div className="overflow-auto flex min-h-full flex-col">
        <p className="mb-10">
          <Logo />
        </p>

        <div className="flex-1">
          <ul className="space-y-2">
            {mainItems.map((item) => (
              <SideNavItem item={item} key={item.href} />
            ))}
          </ul>
          <ul className="mt-6 border-t border-slate-300 py-8 space-y-3 dark:text-slate-500">
            {subItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600">
            © 2022 nino. All rights reserved.
          </p>
        </div>

        {user && (
          <button
            onClick={logout}
            className="flex mt-10 space-x-4 py-4 text-pink-700"
          >
            <LogoutIcon className="w-6 h-6" />
            <span>ログアウト</span>
          </button>
        )}
      </div>
    </div>
  );
};

const SideNav: FC<{
  open: boolean;
  onClose: VoidFunction;
}> = ({ open, onClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        as="div"
        className="relative md:hidden z-40"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black/25" />
        <Dialog.Panel className="fixed inset-y-0 w-[80%]">
          <SideMenu />
        </Dialog.Panel>
      </Dialog>

      <div className="fixed inset-y-0 w-80">
        <SideMenu />
      </div>
    </div>
  );
};

export default SideNav;
