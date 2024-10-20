'use client';

import React, { FC } from 'react';
import useSWR from 'swr';
import { axiosGetFetcher } from '@/utils/helpers/swr';
import { useSetRecoilState } from 'recoil';
import { codeState } from '@/store/atoms/code.atom';
import { industryState } from '@/store/atoms/industry.atom';
import { cityState, countriesState } from '@/store/atoms/location.atom';

interface IBaseLayout {
  children: React.ReactNode;
}

const BaseLayout: FC<IBaseLayout> = ({ children }) => {
  const setCountries = useSetRecoilState(countriesState);
  const setCity = useSetRecoilState(cityState);
  const setCode = useSetRecoilState(codeState);
  const setIndustry = useSetRecoilState(industryState);

  const { error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/data`,
    axiosGetFetcher,
    {
      onSuccess: data => {
        if (data) {
          setCountries(data.country);
          setCity(data.city);
          setCode(data.Code);
          setIndustry(data.Industry);
        }
      },
    },
  );

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default BaseLayout;
