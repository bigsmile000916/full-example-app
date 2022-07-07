import React, { FC, ReactNode } from 'react';

const PageTitle: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <h1 className="text-slate-200 font-bold text-2xl mb-6">{children}</h1>;
};

export default PageTitle;
