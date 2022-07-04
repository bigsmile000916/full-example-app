import Link from 'next/link';

import {
  CogIcon,
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  RssIcon,
  UserIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const items = [
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
  {
    icon: CogIcon,
    label: 'Settings',
    href: '/settings',
  },
];

const SideNav = () => {
  const router = useRouter();

  return (
    <div className="bg-slate-800 shadow p-12 text-white h-screen overflow-auto sticky top-0">
      <div className="overflow-auto flex min-h-full flex-col">
        <p className="mb-10 font-bold text-2xl">
          <img src="/logo.svg" alt="Logo" />
        </p>

        <div className="flex-1">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <a
                    className={classNames(
                      'flex items-center space-x-4 py-4',
                      router.pathname === item.href
                        ? 'text-blue-500'
                        : 'text-slate-400 hover:text-blue-200'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 border-t border-slate-700 py-8 space-y-3 text-slate-500">
            <li>About</li>
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>Contact</li>
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
