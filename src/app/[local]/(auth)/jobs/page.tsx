import React from 'react';
import Jobs from '@/client_pages/jobs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jobs',
};

const Page = async () => {
  return (
    <>
      <Jobs />
    </>
  );
};

export default Page;
