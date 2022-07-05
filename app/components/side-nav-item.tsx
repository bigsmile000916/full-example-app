import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, SVGProps } from 'react';

const SideNavItem: FC<{
  item: {
    href: string;
    label: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  };
}> = ({ item }) => {
  const router = useRouter();

  let active = Boolean(router.asPath.match(new RegExp('^' + item.href)));

  if (item.href === '/') {
    active = router.asPath === '/';
  }

  return (
    <li>
      <Link href={item.href}>
        <a
          className={classNames(
            'flex items-center space-x-4 py-4',
            active ? 'text-blue-500' : 'text-slate-300 hover:text-blue-200'
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </a>
      </Link>
    </li>
  );
};

export default SideNavItem;
