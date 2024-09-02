'use client';
import React from 'react';

const Home = () => {
  // const t = useTranslations('users');
  //
  // const objects = [
  //   {
  //     key: 'name',
  //     value: 'Poxos',
  //     type: InputTypeEnum.Text,
  //     sx: {
  //       backgroundColor: 'red',
  //     },
  //   },
  //   {
  //     key: 'age',
  //     value: 18,
  //     type: InputTypeEnum.Number,
  //     sx: {
  //       backgroundColor: 'blue',
  //     },
  //   },
  //   {
  //     key: 'city',
  //     value: 'Yerevan',
  //     type: InputTypeEnum.Text,
  //     sx: {
  //       backgroundColor: 'green',
  //     },
  //   },
  //   {
  //     key: 'country',
  //     value: 'Armenia',
  //     type: InputTypeEnum.Text,
  //     sx: {
  //       backgroundColor: 'yellow',
  //     },
  //   },
  //   {
  //     key: 'phone',
  //     value: '0123456789',
  //     type: InputTypeEnum.Text,
  //     sx: {
  //       backgroundColor: 'orange',
  //     },
  //   },
  //   {
  //     key: 'job',
  //     value: 'Engineer',
  //     type: InputTypeEnum.Text,
  //     sx: {
  //       backgroundColor: 'purple',
  //     },
  //   },
  //   {
  //     key: 'position',
  //     value: 'Yes',
  //     type: InputTypeEnum.Text,
  //     sx: {
  //       backgroundColor: 'pink',
  //     },
  //     methods: {
  //       onClick: () => console.log('clicked'),
  //     },
  //   },
  // ];
  //
  // const rows: Array<AdminTableRowType> = [
  //   {
  //     id: 1,
  //     row: objects,
  //   },
  //   {
  //     id: 2,
  //     row: objects,
  //   },
  // ];

  return (
    <>
      {/*<AdminTable*/}
      {/*  title={t('title')}*/}
      {/*  filter={{*/}
      {/*    filterInputs: [*/}
      {/*      {*/}
      {/*        id: 1,*/}
      {/*        name: 'name',*/}
      {/*        type: InputTypeEnum.Text,*/}
      {/*        sx: {*/}
      {/*          backgroundColor: 'red',*/}
      {/*        },*/}
      {/*        attr: {*/}
      {/*          placeholder: 'Password',*/}
      {/*        },*/}
      {/*        methods: {*/}
      {/*          onClick: () => console.log('click'),*/}
      {/*        },*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 2,*/}
      {/*        name: 'age',*/}
      {/*        type: InputTypeEnum.Number,*/}
      {/*        sx: {*/}
      {/*          backgroundColor: 'blue',*/}
      {/*        },*/}
      {/*        attr: {},*/}
      {/*        methods: {*/}
      {/*          onClick: () => console.log('click'),*/}
      {/*        },*/}
      {/*      },*/}
      {/*      { id: 3, name: 'date', type: InputTypeEnum.Date },*/}
      {/*      { id: 4, name: 'range', type: InputTypeEnum.Range },*/}
      {/*      { id: 5, name: 'select', type: InputTypeEnum.Select },*/}
      {/*    ],*/}
      {/*    isSearchButton: true,*/}
      {/*  }}*/}
      {/*  actions={{*/}
      {/*    leftButtons: {*/}
      {/*      isSelect: true,*/}
      {/*      isExport: true,*/}
      {/*      buttons: [*/}
      {/*        {*/}
      {/*          id: 1,*/}
      {/*          style: {*/}
      {/*            backgroundColor: 'red',*/}
      {/*            color: 'blue',*/}
      {/*          },*/}
      {/*          text: 'Add 1',*/}
      {/*          icon: <NextIcon />,*/}
      {/*          methods: {*/}
      {/*            onClick: () => console.log('click'),*/}
      {/*            onMouseOver: () => console.log('onMouseOver'),*/}
      {/*          },*/}
      {/*        },*/}
      {/*        {*/}
      {/*          id: 2,*/}
      {/*          style: {*/}
      {/*            backgroundColor: 'red',*/}
      {/*            color: 'blue',*/}
      {/*          },*/}
      {/*          text: 'onMouseOver',*/}
      {/*          methods: {*/}
      {/*            onMouseOver: () => console.log('onMouseOver'),*/}
      {/*          },*/}
      {/*        },*/}
      {/*        {*/}
      {/*          id: 3,*/}
      {/*          style: {*/}
      {/*            width: 200,*/}
      {/*            color: 'green',*/}
      {/*          },*/}
      {/*          text: 'Click',*/}
      {/*          icon: <NextIcon width={20} height={20} />,*/}
      {/*          methods: {*/}
      {/*            onClick: () => console.log('click'),*/}
      {/*          },*/}
      {/*        },*/}
      {/*        {*/}
      {/*          id: 4,*/}
      {/*          style: {*/}
      {/*            width: 100,*/}
      {/*            color: 'green',*/}
      {/*          },*/}
      {/*          text: 'Add',*/}
      {/*          icon: <NextIcon />,*/}
      {/*          methods: {*/}
      {/*            onClick: () => console.log('click'),*/}
      {/*          },*/}
      {/*        },*/}
      {/*        {*/}
      {/*          id: 5,*/}
      {/*          style: {},*/}
      {/*          text: 'Add 2',*/}
      {/*          methods: {*/}
      {/*            onClick: () => console.log('click'),*/}
      {/*          },*/}
      {/*        },*/}
      {/*      ],*/}
      {/*    },*/}
      {/*    rightButtons: {*/}
      {/*      isCreate: true,*/}
      {/*      buttons: [*/}
      {/*        {*/}
      {/*          id: 1,*/}
      {/*          style: {*/}
      {/*            width: 100,*/}
      {/*            color: 'green',*/}
      {/*          },*/}
      {/*          text: 'Clicl',*/}
      {/*          methods: {*/}
      {/*            onClick: () => console.log('click'),*/}
      {/*          },*/}
      {/*        },*/}
      {/*      ],*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  createUpdateRow={{*/}
      {/*    formInputs: [*/}
      {/*      {*/}
      {/*        id: 1,*/}
      {/*        name: 'name',*/}
      {/*        type: InputTypeEnum.Text,*/}
      {/*        sx: {*/}
      {/*          color: 'white',*/}
      {/*          // backgroundColor: 'red',*/}
      {/*        },*/}
      {/*        attr: {*/}
      {/*          placeholder: 'Name...',*/}
      {/*        },*/}
      {/*        methods: {*/}
      {/*          onMouseOver: () => console.log('mouseOver'),*/}
      {/*        },*/}
      {/*        useInUpdate: true,*/}
      {/*        useInCreation: true,*/}
      {/*        validation: {*/}
      {/*          required: 'This field is required',*/}
      {/*          maxLength: { value: 10, message: 'Max length is 10' },*/}
      {/*        },*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 2,*/}
      {/*        name: 'city',*/}
      {/*        type: InputTypeEnum.Text,*/}
      {/*        sx: {*/}
      {/*          color: 'white',*/}
      {/*          // backgroundColor: 'blue',*/}
      {/*        },*/}
      {/*        attr: {*/}
      {/*          placeholder: 'City...',*/}
      {/*        },*/}
      {/*        useInUpdate: false,*/}
      {/*        useInCreation: true,*/}
      {/*      },*/}
      {/*    ],*/}
      {/*    createUrl: '/create',*/}
      {/*    updateUrl: '/update',*/}
      {/*  }}*/}
      {/*  columns={[*/}
      {/*    { id: 1, key: 'name', name: 'Anun', isSortable: true, style: { backgroundColor: 'red' } },*/}
      {/*    { id: 2, key: 'age', name: 'Tariq', isSortable: true, style: { fontWeight: 'bold' } },*/}
      {/*    { id: 3, key: 'city', name: 'City' },*/}
      {/*    { id: 4, key: 'country', name: 'Country' },*/}
      {/*    { id: 5, key: 'phone', name: 'Phone' },*/}
      {/*    { id: 6, key: 'x', name: 'Job' },*/}
      {/*    { id: 7, key: 'position', name: 'Position' },*/}
      {/*  ]}*/}
      {/*  rows={rows}*/}
      {/*/>*/}
    </>
  );
};

export default Home;
