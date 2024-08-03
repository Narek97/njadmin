'use client';
import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';

interface IRecoilProvider {
  children: React.ReactNode;
}

const RecoilProvider: FC<IRecoilProvider> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
