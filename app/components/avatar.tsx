import classNames from 'classnames';
import React from 'react';

type Props = {
  src: string;
  size?: 'sm' | 'md';
  alt?: string;
};

const Avatar = ({ src, alt = '', size = 'sm' }: Props) => {
  const sizeClass = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
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
