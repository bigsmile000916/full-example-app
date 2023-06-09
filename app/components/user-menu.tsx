import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { logout, useRequireAuth } from '../lib/auth';
import DropdownLinkItem from './dropdown-link-item';
import ThemeSwitch from './theme-switch';

const items = [
  {
    label: '投稿管理',
    href: '/manage',
  },
  {
    label: 'プロフィール編集',
    href: '/profile/edit',
  },
  {
    label: '設定',
    href: '/settings',
  },
];

const UserMenu = () => {
  const { user } = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="block w-10 h-10 rounded-full overflow-hidden">
        <img src={user.photoUrl} alt="" className="block" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y dark:divide-slate-600 rounded-md dark:bg-slate-700 bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-3 py-2">
            <ThemeSwitch />
          </div>
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <DropdownLinkItem
                    href={item.href}
                    className={classNames(
                      active && 'bg-blue-500 text-white',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    )}
                  >
                    {item.label}
                  </DropdownLinkItem>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={classNames(
                    active && 'bg-blue-500 text-white',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                  )}
                >
                  ログアウト
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
