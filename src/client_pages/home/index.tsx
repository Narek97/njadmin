'use client';
import React from 'react';
import AdminTable from '@/components/templates/admin-table/admin-table';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import NextIcon from '@/public/next.svg';
import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations('users');

  return (
    <>
      <AdminTable
        title={t('title')}
        filter={{
          filterInputs: [
            {
              id: 1,
              name: 'name',
              type: InputTypeEnum.Text,
              sx: {
                backgroundColor: 'red',
              },
              attr: {
                placeholder: 'Password',
              },
              methods: {
                onClick: () => console.log('click'),
              },
            },
            {
              id: 2,
              name: 'age',
              type: InputTypeEnum.Number,
              sx: {
                backgroundColor: 'blue',
              },
              attr: {},
              methods: {
                onClick: () => console.log('click'),
              },
            },
            { id: 3, name: 'date', type: InputTypeEnum.Date },
            { id: 4, name: 'range', type: InputTypeEnum.Range },
            { id: 5, name: 'select', type: InputTypeEnum.Select },
          ],
          searchUrl: 'base/user',
          isSearchButton: true,
        }}
        actions={{
          leftButtons: {
            isSelect: true,
            isExport: true,
            buttons: [
              {
                id: 1,
                style: {
                  backgroundColor: 'red',
                  color: 'blue',
                },
                text: 'Add 1',
                icon: <NextIcon />,
                methods: {
                  onClick: () => console.log('click'),
                  onMouseOver: () => console.log('onMouseOver'),
                },
              },
              {
                id: 2,
                style: {
                  backgroundColor: 'red',
                  color: 'blue',
                },
                text: 'onMouseOver',
                methods: {
                  onMouseOver: () => console.log('onMouseOver'),
                },
              },
              {
                id: 3,
                style: {
                  width: 200,
                  color: 'green',
                },
                text: 'Click',
                icon: <NextIcon width={20} height={20} />,
                methods: {
                  onClick: () => console.log('click'),
                },
              },
              {
                id: 4,
                style: {
                  width: 100,
                  color: 'green',
                },
                text: 'Add',
                icon: <NextIcon />,
                methods: {
                  onClick: () => console.log('click'),
                },
              },
              {
                id: 5,
                style: {},
                text: 'Add 2',
                methods: {
                  onClick: () => console.log('click'),
                },
              },
            ],
          },
          rightButtons: {
            isCreate: true,
            buttons: [
              {
                id: 1,
                style: {
                  width: 100,
                  color: 'green',
                },
                text: 'Clicl',
                methods: {
                  onClick: () => console.log('click'),
                },
              },
            ],
          },
        }}
        createUpdateRow={{
          formInputs: [
            {
              id: 1,
              name: 'name',
              type: InputTypeEnum.Text,
              sx: {
                color: 'white',
                // backgroundColor: 'red',
              },
              attr: {
                placeholder: 'Name...',
              },
              methods: {
                onMouseOver: () => console.log('mouseOver'),
              },
              useInUpdate: true,
              useInCreation: true,
              validation: {
                required: 'This field is required',
                maxLength: { value: 10, message: 'Max length is 10' },
              },
            },
            {
              id: 2,
              name: 'surname',
              type: InputTypeEnum.Text,
              sx: {
                color: 'white',
                // backgroundColor: 'blue',
              },
              attr: {
                placeholder: 'Surname...',
              },
              useInUpdate: false,
              useInCreation: true,
            },
          ],
          createUrl: '/create',
          updateUrl: '/update',
        }}
      />
    </>
  );
};

export default Home;
