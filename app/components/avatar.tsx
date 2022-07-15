import classNames from 'classnames';
import React from 'react';

type Props = {
  src: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
};

const Avatar = ({ src, alt = '', size = 'sm' }: Props) => {
  const sizeClass = {
    sm: 'w-10 h-10',
    lg: 'w-12 h-12',
    md: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <img
      src={src}
      alt={alt}
      className={classNames('rounded-full bg-slate-700 block', sizeClass[size])}
    />
  );
};

export default Avatar;
