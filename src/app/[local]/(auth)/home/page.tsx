import React from 'react';
import Home from '@/client_pages/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

const Page = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Page;
