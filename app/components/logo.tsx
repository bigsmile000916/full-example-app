import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <a className="relative flex">
        <Image src="/logo.svg" alt="Logo" width={184} height={40} />
      </a>
    </Link>
  );
};

export default Logo;
