import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import React from 'react';

export type AType = {
  useInCreation: boolean;
  useInUpdate: boolean;
};

export type AdminTableInputType = {
  id: number;
  name: string;
  type: InputTypeEnum;
  label?: string;
  icon?: React.ReactNode;
  defaultValue?: string | number | Date | boolean;
  sx?: {};
  attr?: {};
  methods?: {};
  validation?: {};
  value?: any; //todo
};

export type AdminTableType = {
  title: string;

  filter?: {
    filterInputs: Array<AdminTableInputType>;
    isSearchButton: boolean;
    searchUrl: string;
  };

  actions?: {
    leftButtons?: {
      isSelect: boolean;
      isExport: boolean;
      buttons?: Array<{
        id: number;
        style?: {};
        text?: string;
        icon?: React.ReactNode;
        methods?: {};
      }>;
    };

    rightButtons?: {
      isCreate: boolean;
      buttons: Array<{
        id: number;
        style?: {};
        text?: string;
        icon?: React.ReactNode;
        methods?: {};
      }>;
    };
  };
  createUpdateRow: {
    formInputs: Array<AdminTableInputType & AType>;
    createUrl: string;
    updateUrl: string;
  };
};
