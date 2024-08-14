'use client';
import { TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';

interface ICustomInput {
  input: AdminTableInputType;
  errors?: FieldErrors<any>;
  register?: UseFormRegister<any>;
}

const CustomInput: FC<ICustomInput & TextFieldProps> = ({
  input,
  errors,
  register,
  ...inputRestParams
}) => {
  return (
    <>
      {register && errors ? (
        <TextField
          {...input.attr}
          {...input.methods}
          {...register(input.name, { ...input.validation })}
          sx={input.sx}
          error={!!errors.name}
          helperText={errors[input.name] ? (errors[input.name] as any).message : ''}
          {...inputRestParams}
        />
      ) : (
        <TextField {...input.attr} {...input.methods} sx={input.sx} {...inputRestParams} />
      )}
    </>
  );
};

export default CustomInput;
