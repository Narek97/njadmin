'use client';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface ICustomSelect {
  input: AdminTableInputType;
  watch?: UseFormWatch<ObjectKeysType>;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const CustomSelect: FC<ICustomSelect> = ({
  input,
  errors,
  watch,
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
      <InputLabel id="demo-simple-select-label">{input.attr?.label}</InputLabel>
      <Select
        {...input.attr}
        {...input.methods}
        {...(register ? register(input.name, input.validation) : {})}
        sx={input.sx}
        value={watch ? watch(input.name) : ''}
        id={input.name} // For accessibility
        {...inputRestParams}
        defaultValue=""
        onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {input.options?.map((option, index) => (
          <MenuItem value={option.id} key={index}>
            {option.name || option.title || ''}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;