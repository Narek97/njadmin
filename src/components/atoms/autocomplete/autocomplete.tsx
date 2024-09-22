import React, { FC } from 'react';
import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface ICustomAutocomplete {
  input: AdminTableInputType;
  errors?: FieldErrors<ObjectKeysType>;
  watch?: UseFormWatch<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  setFormValue?: UseFormSetValue<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const CustomAutocomplete: FC<ICustomAutocomplete> = ({
  input,
  errors,
  watch,
  register,
  setFormValue,
  clearErrors,
  ...inputRestParams
}) => {
  const hasError = errors && errors[input.name];
  const errorMessage = hasError ? (errors[input.name]?.message as string) : '';

  const handleChange = ({ id }: { id: number }) => {
    if (setFormValue) {
      setFormValue(input.name, id, { shouldValidate: true });
    }
    if (clearErrors) {
      clearErrors(input.name);
    }
  };
  return (
    <>
      <FormControl fullWidth error={!!hasError}>
        <Autocomplete
          {...input.attr}
          {...input.methods}
          {...(register ? register(input.name, input.validation) : {})}
          sx={input.sx}
          value={watch ? input.options?.find(op => op.id === watch(input.name)) : ''}
          id={input.name} // For accessibility
          {...inputRestParams}
          options={input.options?.slice(0, 100) || []}
          getOptionLabel={option => option?.name}
          onChange={(_, newValue) => {
            handleChange(newValue); // Handle change
          }}
          renderInput={params => <TextField {...params} label={input.attr?.label || ''} />}
        />
        {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default CustomAutocomplete;
