import React, { FC } from 'react';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import CustomInput from '@/components/atoms/input/input';
import CustomAutocomplete from '@/components/atoms/autocomplete/autocomplete';

interface IFormElement {
  input: AdminTableInputType;
  value: string | number | boolean;
  onHandleChange: ({ name, value }: { name: string; value: any }) => void;
}

const FilterElement: FC<IFormElement> = ({ input, value, onHandleChange }) => {
  const getInputByType: ObjectKeysType = {
    text: (
      <>
        <CustomInput
          type={'text'}
          input={input}
          name={input.name}
          value={(value as string) || ''}
          onChange={e => {
            onHandleChange({ name: e.target.name, value: e.target.value });
          }}
        />
      </>
    ),
    number: (
      <>
        <CustomInput
          type={'number'}
          input={input}
          name={input.name}
          value={+value || 0}
          onChange={e => {
            onHandleChange({ name: e.target.name, value: e.target.value });
          }}
        />
      </>
    ),
    select: (
      <>
        <CustomAutocomplete
          input={input}
          value={value}
          setFormValue={(name, value) => {
            onHandleChange({ name, value });
          }}
        />
      </>
    ),
    date: (
      <>
        <input
          style={{
            width: '100%',
            height: '50px',
            padding: '16.5px 14px',
            border: '1px solid #0000003b',
            borderRadius: '4px',
            color: '#0009',
            backgroundColor: 'transparent',
          }}
          type={'date'}
          name={input.name}
          value={(value as string) || new Date().toISOString().split('T')[0]}
          onChange={e => {
            onHandleChange({ name: e.target.name, value: e.target.value });
          }}
        />
      </>
    ),
    checkbox: (
      <>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#0009',
          }}>
          <input
            type="checkbox"
            name={input.name}
            checked={(value as boolean) || false}
            onChange={e => {
              onHandleChange({ name: e.target.name, value: e.target.checked });
            }}
          />
          {input.attr?.label || ''}
        </label>
      </>
    ),
  };

  return <>{getInputByType[input.type]}</>;
};

export default FilterElement;
