import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import React from 'react';

export type CreateUpdateType = {
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
  sx?: React.CSSProperties;
  attr?: {};
  methods?: {};
  validation?: {};
  value?: any; //todo
};

export type AdminTableColumnType = {
  id: number;
  key: string;
  name: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: React.CSSProperties;
  isSortable?: boolean;
};

export type RowType = {
  key: string;
  value: string | number | Date | boolean;
  type: InputTypeEnum;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  sx?: React.CSSProperties;
  attr?: {};
  methods?: {};
};

export type AdminTableRowType = {
  id: number;
  row: Array<RowType>;
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
    formInputs: Array<AdminTableInputType & CreateUpdateType>;
    createUrl: string;
    updateUrl: string;
  };

  columns: Array<AdminTableColumnType>;

  rows: Array<AdminTableRowType>;

  onHandleSortTable?: (sortType: 'asc' | 'desc') => void;
};
