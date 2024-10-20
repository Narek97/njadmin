'use client';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface ICustomSelect {
  input: AdminTableInputType;
  value?: any;
  watch?: UseFormWatch<ObjectKeysType>;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  setFormValue?: UseFormSetValue<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const CustomSelect: FC<ICustomSelect> = ({
  input,
  value,
  errors,
  watch,
  register,
  setFormValue,
  clearErrors,
  ...inputRestParams
}) => {
  const hasError = errors && errors[input.name];
  const errorMessage = hasError ? (errors[input.name]?.message as string) : '';
  const valueKey = input.requiredField || 'id';

  const handleChange = (item: any) => {
    if (clearErrors) {
      clearErrors(input.name);
    }
    if (setFormValue) {
      setFormValue(input.name, item.props.value, { shouldValidate: true });
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
        value={watch ? watch(input.name) : (value ?? '')}
        id={input.name} // For accessibility
        {...inputRestParams}
        defaultValue=""
        onChange={(_, newValue) => {
          handleChange(newValue); // Handle change
        }}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {input.options?.map((option, index) => (
          <MenuItem value={option[valueKey]} key={index}>
            {option.name || option.title || ''}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
