import React, { FC, useState } from 'react';
import './create-update-modal-content.scss';
import { AdminTableInputType, CreateUpdateType } from '@/utils/ts/types/admin-table.types';
import { useForm } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import { CRUDEnum } from '@/utils/ts/enums/global.enums';
import FormElement from '@/components/templates/admin-table/form-element/form-element';

interface ICreateUpdateModalContent {
  createUpdateRow: {
    formInitialData: ObjectKeysType;
    formInputs?: Array<AdminTableInputType & CreateUpdateType>;
    onHandleConfirmCreate: (
      forms: any,
      onSuccess?: () => void,
      onError?: () => void,
    ) => Promise<void>;
    onHandleConfirmUpdate: (
      forms: any,
      onSuccess?: () => void,
      onError?: () => void,
    ) => Promise<void>;
  };
  createUpdateModalType: CRUDEnum;
  onHandleToggleCreateUpdateModalModal: () => void;
}

const CreateUpdateModalContent: FC<ICreateUpdateModalContent> = ({
  createUpdateRow,
  createUpdateModalType,
  onHandleToggleCreateUpdateModalModal,
}) => {
  const { formInitialData, formInputs, onHandleConfirmCreate, onHandleConfirmUpdate } =
    createUpdateRow;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof formInitialData>({
    defaultValues: formInitialData,
  });

  const onHandleSubmit = async (formData: typeof formInitialData) => {
    if (createUpdateModalType === CRUDEnum.Create) {
      try {
        setIsLoading(true);
        await onHandleConfirmCreate(formData);
        onHandleToggleCreateUpdateModalModal();
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    } else {
      try {
        setIsLoading(true);

        await onHandleConfirmUpdate(formData);
        onHandleToggleCreateUpdateModalModal();
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  };

  return (
    <div className={'create-update-modal-content'}>
      <form className={`create-update-modal-content--form`} onSubmit={handleSubmit(onHandleSubmit)}>
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

        <input type="submit" disabled={isLoading} />
      </form>
    </div>
  );
};

export default CreateUpdateModalContent;
