import Link from 'next/link';
import { AnchorHTMLAttributes, FC, forwardRef, ReactNode } from 'react';

const DropdownLinkItem = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  }
>((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href!}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

DropdownLinkItem.displayName = 'DropdownLinkItem';

export default DropdownLinkItem;
