import React, { FC } from 'react';
import './create-update-modal-content.scss';
import { AdminTableInputType, AType } from '@/utils/ts/types/admin-table.types';
import { useForm } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import { CRUDEnum } from '@/utils/ts/enums/global.enums';
import FormElement from '@/components/templates/admin-table/form-element/form-element';

interface ICreateUpdateModalContent {
  createUpdateRow: {
    formInitialData: ObjectKeysType;
    formInputs?: Array<AdminTableInputType & AType>;
    createUrl: string;
    updateUrl: string;
  };
  createUpdateModalType: CRUDEnum;
}

const CreateUpdateModalContent: FC<ICreateUpdateModalContent> = ({
  createUpdateRow,
  createUpdateModalType,
}) => {
  const { formInitialData, formInputs, createUrl, updateUrl } = createUpdateRow;
  console.log(formInitialData, 'formInitialData');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof formInitialData>({
    defaultValues: formInitialData,
  });

  const onHandleSubmit = (formData: typeof formInitialData) => {
    if (createUpdateModalType === CRUDEnum.Create) {
      console.log(createUrl, 'createUrl');
    } else {
      console.log(updateUrl, 'updateUrl');
    }
  };
  return (
    <div className={'create-update-modal-content'}>
      <form
        data-testid="create-edit-form-block-test-id"
        className={`create-update-modal-content--form`}
        onSubmit={handleSubmit(onHandleSubmit)}>
        {formInputs?.map(input => {
          return createUpdateModalType === CRUDEnum.Create && input.useInCreation ? (
            <div key={input.id}>
              <FormElement input={input} errors={errors} register={register} />
            </div>
          ) : createUpdateModalType === CRUDEnum.Update && input.useInUpdate ? (
            <div key={input.id}>
              <FormElement input={input} errors={errors} register={register} />

              {/*<TextField*/}
              {/*  {...register(input.name, { ...input.validation })}*/}
              {/*  {...input.attr}*/}
              {/*  {...input.methods}*/}
              {/*  sx={input.sx}*/}
              {/*  error={!!errors.name}*/}
              {/*  helperText={errors[input.name] ? (errors[input.name] as any).message : ''}*/}
              {/*/>*/}
              {/*{errors[input.name] && (*/}
              {/*  <p>{(errors[input.name] as any)?.message || 'This field is required'}</p>*/}
              {/*)}*/}
            </div>
          ) : null;
        })}

        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateUpdateModalContent;
