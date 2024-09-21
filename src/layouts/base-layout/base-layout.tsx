'use client';

import React, { FC } from 'react';

interface IBaseLayout {
  children: React.ReactNode;
}

const BaseLayout: FC<IBaseLayout> = ({ children }) => {
  return <>{children}</>;
};

export default BaseLayout;
