import React from 'react';
import { Metadata } from 'next';
import Employees from '@/client_pages/employees';

export const metadata: Metadata = {
  title: 'Employees',
};

const Page = () => {
  return (
    <>
      <Employees />
    </>
  );
};

export default Page;
