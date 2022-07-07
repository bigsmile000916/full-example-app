import classNames from 'classnames';
import Link from 'next/link';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ReactNode,
} from 'react';

const Button: FC<
  (
    | ButtonHTMLAttributes<HTMLButtonElement>
    | (AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      })
  ) & {
    children: ReactNode;
  }
> = (props) => {
  const className = classNames(
    'bg-blue-500 text-white px-3 py-2 rounded-full min-w-[80px] text-center',
    props.className
  );

  if ('href' in props) {
    const { href, children, ...linkProps } = props;

    return (
      <Link href={href}>
        <a {...linkProps} className={className}>
          {children}
        </a>
      </Link>
    );
  } else {
    const { children, ...buttonProps } = props;

    return (
      <button {...buttonProps} className={className}>
        {children}
      </button>
    );
  }
};

export default Button;
