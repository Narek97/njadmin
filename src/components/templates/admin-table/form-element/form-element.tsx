import React, { FC } from 'react';
import CustomInput from '@/components/atoms/input/input';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import QuillEditor from '@/components/atoms/quill-editor/quill-editor';
import CustomSelect from '@/components/atoms/select/select';
import CustomDatePicker from '@/components/atoms/date-picker/date-picker';
import CustomCheckbox from '@/components/atoms/checkbox/checkbox';

interface IFormElement {
  input: AdminTableInputType;
  errors: FieldErrors<ObjectKeysType>;
  register: UseFormRegister<ObjectKeysType>;
  setValue?: UseFormSetValue<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const FormElement: FC<IFormElement> = ({ input, errors, register, setValue, clearErrors }) => {
  const commonProps = { input, errors, register, clearErrors };

  const getInputByType = (): JSX.Element => {
    switch (input.type) {
      case 'number':
        return <CustomInput {...commonProps} type="number" />;

      case 'date':
        return <CustomDatePicker {...commonProps} />;

      case 'select':
        return <CustomSelect {...commonProps} />;

      case 'quill':
        return (
          <QuillEditor
            {...commonProps}
            setValue={setValue} // Only pass if it exists
          />
        );

      case 'checkbox':
        return <CustomCheckbox {...commonProps} />;

      default:
        return <CustomInput {...commonProps} />;
    }
  };

  return <>{getInputByType()}</>;
};

export default FormElement;
