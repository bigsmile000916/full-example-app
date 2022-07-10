import Link from 'next/link';

import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  RssIcon,
  UserIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import SideNavItem from './side-nav-item';

const mainItems = [
  {
    icon: HomeIcon,
    label: 'Home',
    href: '/',
  },
  {
    icon: RssIcon,
    label: 'News',
    href: '/news',
  },
  {
    icon: HeartIcon,
    label: 'Likes',
    href: '/likes',
  },
  {
    icon: UserIcon,
    label: 'Profile',
    href: '/profile',
  },
];

const subItems = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Terms of service',
    href: '/terms',
  },
  {
    label: 'Privacy policy',
    href: '/privacy',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const SideNav = () => {
  return (
    <div className="bg-slate-800 shadow p-12 text-white h-screen overflow-auto sticky top-0">
      <div className="overflow-auto flex min-h-full flex-col">
        <p className="mb-10">
          <Link href="/">
            <a className="h-10 block relative">
              <Image
                src="/logo.svg"
                layout="fill"
                alt="Logo"
                objectPosition="left"
                objectFit="contain"
              />
            </a>
          </Link>
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

        <button className="flex space-x-4 py-4 text-pink-700">
          <LogoutIcon className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
