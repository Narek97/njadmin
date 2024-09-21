'use client';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';
import { FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface ICustomSelect {
  input: AdminTableInputType;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const CustomSelect: FC<ICustomSelect> = ({
  input,
  errors,
  register,
  clearErrors,
  ...inputRestParams
}) => {
  const hasError = errors && errors[input.name];
  const errorMessage = hasError ? (errors[input.name]?.message as string) : '';

  const handleChange = () => {
    if (clearErrors) {
      clearErrors(input.name);
    }
  };

  return (
    <FormControl fullWidth error={!!hasError}>
      <Select
        {...input.attr}
        {...input.methods}
        {...(register ? register(input.name, input.validation) : {})}
        sx={input.sx}
        id={input.name} // For accessibility
        {...inputRestParams}
        onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {input.options?.map(option => (
          <MenuItem value={option.id} key={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
