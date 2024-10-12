import React, { FC } from 'react';
import CustomInput from '@/components/atoms/input/input';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import QuillEditor from '@/components/atoms/quill-editor/quill-editor';
import CustomDatePicker from '@/components/atoms/date-picker/date-picker';
import CustomCheckbox from '@/components/atoms/checkbox/checkbox';
import CustomAutocomplete from '@/components/atoms/autocomplete/autocomplete';
import CustomSelect from '@/components/atoms/select/select';
import FileUploader from '@/components/atoms/file-uploader/file-uploader';

interface IFormElement {
  input: AdminTableInputType;
  errors: FieldErrors<ObjectKeysType>;
  watch: UseFormWatch<ObjectKeysType>;
  register: UseFormRegister<ObjectKeysType>;
  setFormValue?: UseFormSetValue<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const FormElement: FC<IFormElement> = ({
  input,
  errors,
  watch,
  register,
  clearErrors,
  setFormValue,
}) => {
  const commonProps = { input, errors, register, clearErrors };
  console.log(errors, 'errors');
  const getInputByType = (): JSX.Element => {
    switch (input.type) {
      case 'number':
        return <CustomInput {...commonProps} type="number" />;

      case 'date':
        return <CustomDatePicker {...commonProps} />;

      case 'select':
        return <CustomSelect {...commonProps} watch={watch} setFormValue={setFormValue} />;

      case 'autocomplete': {
        return <CustomAutocomplete {...commonProps} setFormValue={setFormValue} watch={watch} />;
      }

      case 'quill':
        return <QuillEditor {...commonProps} setFormValue={setFormValue} />;

      case 'checkbox':
        return <CustomCheckbox {...commonProps} />;

      case 'file':
        return <FileUploader {...commonProps} />;

      default:
        return <CustomInput {...commonProps} />;
    }
  };

  return <>{getInputByType()}</>;
};

export default FormElement;
