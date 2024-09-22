'use client';

import React, { FC } from 'react';
import useSWR from 'swr';
import { axiosGetFetcher } from '@/utils/helpers/swr';
import { useSetRecoilState } from 'recoil';
import { codeState } from '@/store/atoms/code.atom';
import { industryState } from '@/store/atoms/industry.atom';
import { locationState } from '@/store/atoms/location.atom';

interface IBaseLayout {
  children: React.ReactNode;
}

const BaseLayout: FC<IBaseLayout> = ({ children }) => {
  const setLocationState = useSetRecoilState(locationState);
  const setCodeState = useSetRecoilState(codeState);
  const setIndustryState = useSetRecoilState(industryState);

  useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/data`, axiosGetFetcher, {
    onSuccess: data => {
      if (data) {
        setLocationState(data.Location);
        setCodeState(data.Code);
        setIndustryState(data.Industry);
      }
    },
  });

  return <>{children}</>;
};

export default BaseLayout;
