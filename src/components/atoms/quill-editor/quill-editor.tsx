import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import { FormControl, FormHelperText } from '@mui/material';

interface IQuillEditor {
  input: AdminTableInputType;
  errors?: FieldErrors<ObjectKeysType>;
  register?: UseFormRegister<ObjectKeysType>;
  setFormValue?: UseFormSetValue<ObjectKeysType>;
  clearErrors?: UseFormClearErrors<ObjectKeysType>;
}

const QuillEditor: FC<IQuillEditor> = ({
  input,
  errors,
  register,
  setFormValue,
  clearErrors,
  ...inputRestParams
}) => {
  const [editorHtml, setEditorHtml] = useState('');

  const hasError = errors && errors[input.name];
  const errorMessage = hasError ? (errors[input.name]?.message as string) : '';

  const handleChange = (text: string, editor: any) => {
    setEditorHtml(text);
    if (setFormValue) {
      const isValidContent = editor.getLength() > 1;
      setFormValue(input.name, isValidContent ? text : '', { shouldValidate: true });
    }
    if (clearErrors) {
      clearErrors(input.name);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    ],
  };

  return (
    <FormControl fullWidth error={!!hasError}>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={(text, delta, source, editor) => handleChange(text, editor)}
        modules={modules}
        {...inputRestParams}
      />
      {/* Hidden TextField to integrate with react-hook-form validation */}
      <input type="hidden" {...(register ? register(input.name, input.validation) : {})} />
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default QuillEditor;
