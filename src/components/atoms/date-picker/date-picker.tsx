import React, { FC } from 'react';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import { FormControl, FormHelperText, TextField } from '@mui/material';

interface ICustomDatePicker {
  input: AdminTableInputType;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const CustomDatePicker: FC<ICustomDatePicker> = ({
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
      <TextField
        type="date"
        label={input.label || 'Select Date'}
        InputLabelProps={{ shrink: true }} // Ensures the label stays above the date picker
        {...register?.(input.name, input.validation)}
        {...inputRestParams}
        inputProps={{
          ...input.inputProps,
        }}
        onChange={handleChange}
        error={!!hasError}
      />
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomDatePicker;
