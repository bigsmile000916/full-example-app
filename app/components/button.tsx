import classNames from 'classnames';
import Link from 'next/link';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from 'react';

const Button = forwardRef<
  HTMLButtonElement,
  (
    | ButtonHTMLAttributes<HTMLButtonElement>
    | (AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      })
  ) & {
    children: ReactNode;
    level?: 'primary' | 'secondary' | 'tertiary';
  }
>((props, ref) => {
  const styles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'border border-blue-500 text-blue-500',
    tertiary: 'text-blue-500',
  };

  const className = classNames(
    styles[props.level || 'primary'],
    'px-4 py-2 rounded-full min-w-[80px] text-center inline-block',
    props.className
  );

  if ('href' in props) {
    const { href, children, level: _, ...linkProps } = props;

    return (
      <Link href={href}>
        <a {...linkProps} className={className}>
          {children}
        </a>
      </Link>
    );
  } else {
    const { children, level: _, ...buttonProps } = props;

    return (
      <button ref={ref} {...buttonProps} className={className}>
        {children}
      </button>
    );
  }
});

Button.displayName = 'Button';

export default Button;
