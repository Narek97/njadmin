'use client';
import React, { FC } from 'react';
import { Checkbox, FormControl, FormHelperText } from '@mui/material';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface ICustomCheckbox {
  input: AdminTableInputType;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const CustomCheckbox: FC<ICustomCheckbox> = ({
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
    <FormControl error={!!hasError}>
      <Checkbox
        {...input.attr}
        {...input.methods}
        {...(register ? register(input.name, input.validation) : {})}
        {...inputRestParams}
        sx={input.sx}
        id={input.name}
        onChange={handleChange}
      />
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomCheckbox;
