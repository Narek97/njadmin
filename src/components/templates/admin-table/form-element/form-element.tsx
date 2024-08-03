import React, { FC } from 'react';
import CustomInput from '@/components/atoms/input/input';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface IFormElement {
  input: AdminTableInputType;
  errors: FieldErrors<ObjectKeysType>;
  register: UseFormRegister<ObjectKeysType>;
}

const FormElement: FC<IFormElement> = ({ input, errors, register }) => {
  const getInputByType = () => {
    switch (input.type) {
      case 'number': {
        return <CustomInput input={input} errors={errors} register={register} />;
      }

      case 'date': {
        return <input type={'date'} name={input.name} />;
      }

      case 'range': {
        return <input type={'range'} name={input.name} />;
      }

      case 'select': {
        return (
          <select name="pets" id="pet-select">
            <option value="">--Please choose an option--</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
        );
      }

      default: {
        return <CustomInput input={input} errors={errors} register={register} />;
      }
    }
  };

  return <>{getInputByType()}</>;
};

export default FormElement;
