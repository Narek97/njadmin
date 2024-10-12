import React, { FC, useState } from 'react';
import './create-update-modal-content.scss';
import { AdminTableInputType, AdminTableRowActionType } from '@/utils/ts/types/admin-table.types';
import { useForm } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import { CRUDEnum } from '@/utils/ts/enums/global.enums';
import FormElement from '@/components/templates/admin-table/form-element/form-element';

interface ICreateUpdateModalContent {
  createUpdateRow: {
    formInitialData: ObjectKeysType;
    formInputs?: Array<AdminTableInputType & AdminTableRowActionType>;
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
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<typeof formInitialData>({
    defaultValues: formInitialData,
  });

  const onHandleSubmit = async (formData: typeof formInitialData) => {
    if (createUpdateModalType === CRUDEnum.Create) {
      try {
        setIsLoading(true);
        await onHandleConfirmCreate({ ...formData, actionType: 'create', id: 19, user_id: 27 });
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
          if (
            (createUpdateModalType === CRUDEnum.Create && !input.useOnCreate) ||
            (createUpdateModalType === CRUDEnum.Update && !input.useOnUpdate)
          ) {
            return null;
          }
          return (
            <FormElement
              key={input.id}
              input={input}
              errors={errors}
              watch={watch}
              setFormValue={setValue}
              register={register}
              clearErrors={clearErrors}
            />
          );
        })}

        <input type="submit" disabled={isLoading} />
      </form>
    </div>
  );
};

export default CreateUpdateModalContent;
