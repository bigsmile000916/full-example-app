import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const fileName = resolvedTheme === 'dark' ? 'logo-dark' : 'logo';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Link href="/">
      <a className="relative flex">
        <Image src={`/${fileName}.svg`} alt="Logo" width={184} height={40} />
      </a>
    </Link>
  );
};

export default Logo;
