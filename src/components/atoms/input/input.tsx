'use client';
import { FormControl, FormHelperText, TextField, TextFieldProps } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';

interface IInput {
  input: AdminTableInputType;
  errors?: FieldErrors<any>;
  register?: UseFormRegister<any>;
  clearErrors?: UseFormClearErrors<any>;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const CustomInput: FC<IInput & TextFieldProps> = ({
  input,
  errors,
  register,
  clearErrors,
  value,
  onChange,
  ...inputRestParams
}) => {
  const hasError = errors && errors[input.name];
  const errorMessage = hasError ? (errors[input.name]?.message as string) : '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (clearErrors) {
      clearErrors(input.name);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <FormControl fullWidth error={!!hasError}>
      <TextField
        {...input.attr}
        {...input.methods}
        {...(register ? register(input.name, input.validation) : {})}
        sx={input.sx}
        id={input.name} // Ensure accessibility
        value={value}
        {...inputRestParams}
        onChange={handleChange}
      />
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomInput;
