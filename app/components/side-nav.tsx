import Link from 'next/link';

import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  RssIcon,
  UserIcon,
} from '@heroicons/react/outline';
import Logo from './logo';
import SideNavItem from './side-nav-item';
import { useAuth } from '../context/auth';
import { logout } from '../lib/auth';

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

const SideNav = () => {
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
      icon: HeartIcon,
      label: 'お気に入り',
      href: '/likes',
    },
    {
      icon: UserIcon,
      label: 'プロフィール',
      href: `/users/${user?.id}`,
    },
  ];

  return (
    <div className="bg-slate-800 shadow p-12 text-white h-screen overflow-auto sticky top-0">
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
          <ul className="mt-6 border-t border-slate-700 py-8 space-y-3 text-slate-500">
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
            className="flex space-x-4 py-4 text-pink-700"
          >
            <LogoutIcon className="w-6 h-6" />
            <span>ログアウト</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SideNav;
