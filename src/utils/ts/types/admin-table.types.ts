import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import React from 'react';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

export type AdminTableRowActionType = {
  useOnCreate: boolean;
  useOnUpdate: boolean;
  useOnPreview?: boolean;
};

export type AdminTableInputType = {
  id: string;
  name: string;
  type: InputTypeEnum;
  label?: string;
  requiredField?: string;
  isSortable?: boolean;
  icon?: React.ReactNode;
  defaultValue?: string | number | Date | boolean;
  sx?: React.CSSProperties;
  inputProps?: ObjectKeysType;
  attr?: ObjectKeysType;
  methods?: ObjectKeysType;
  validation?: ObjectKeysType;
  value?: any;
  options?: Array<any>;
  renderFunction?: (row: RowType) => React.ReactNode;
};

export type AdminTableColumnType = {
  id: string;
  key: string;
  name: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: React.CSSProperties;
  isSortable?: boolean;
};

export type RowType = {
  key: string;
  value: string | number | boolean | null;
  type: InputTypeEnum;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  sx?: React.CSSProperties;
  attr?: {};
  methods?: {};
  renderFunction?: (row: RowType) => React.ReactNode;
};

export type AdminTableRowType = {
  id: number;
  checked: boolean;
  row: Array<RowType>;
};

export type AdminTableType = {
  title: string;

  filter?: {
    filterInputs: Array<AdminTableInputType>;
    isSearchButton: boolean;
  };

  actions?: {
    leftButtons?: {
      isSelect?: boolean;
      isExport?: boolean;
      buttons?: Array<{
        id: number;
        style?: {};
        text?: string;
        icon?: React.ReactNode;
        methods?: {};
      }>;
    };

    rightButtons?: {
      isCreate?: boolean;
      buttons?: Array<{
        id: number;
        style?: {};
        text?: string;
        icon?: React.ReactNode;
        methods?: {};
      }>;
    };
  };

  createUpdateRow: {
    formInputs: Array<AdminTableInputType & AdminTableRowActionType>;
    onHandleConfirmCreate: (
      forms: any,
      onSuccess?: () => void,
      onError?: () => void,
    ) => Promise<void>;
    onHandleConfirmUpdate: (
      forms: any,
      onSuccess?: () => void,
      onError?: () => void,
    ) => Promise<void>;
  };

  deleteRow: {
    onHandleConfirmDelete: (
      ids: number[],
      onSuccess?: () => void,
      onError?: () => void,
    ) => Promise<void>;
  };

  tableRowItems: Array<ObjectKeysType>;

  isLoading: boolean;
};
