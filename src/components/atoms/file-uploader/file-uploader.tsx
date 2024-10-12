import React, { FC } from 'react';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import { FormControl, FormHelperText } from '@mui/material';

interface IFileUploader {
  input: AdminTableInputType;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
}

const FileUploader: FC<IFileUploader> = ({ input, errors, register, ...inputRestParams }) => {
  const hasError = errors && errors[input.name];
  const errorMessage = hasError ? (errors[input.name]?.message as string) : '';

  return (
    <FormControl fullWidth error={!!hasError}>
      <input type="file" {...(register ? register(input.name, input.validation) : {})} />

      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default FileUploader;
