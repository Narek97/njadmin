'use client';

import React, { FC } from 'react';
import { SWRConfig } from 'swr';

interface ISwrProvider {
  children: React.ReactNode;
}

const SwrProvider: FC<ISwrProvider> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}>
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
