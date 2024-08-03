import React, { ChangeEvent, FC } from 'react';
import CustomInput from '@/components/atoms/input/input';
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';

interface IFormElement {
  input: AdminTableInputType;
  value: string | number;
  onHandleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const FilterElement: FC<IFormElement> = ({ input, value, onHandleChange }) => {
  const getInputByType = () => {
    switch (input.type) {
      case 'number': {
        return (
          <CustomInput
            type={'number'}
            input={input}
            name={input.name}
            value={(+value || 0).toString()}
            onChange={onHandleChange}
          />
        );
      }

      case 'date': {
        return (
          <input
            type={'date'}
            name={input.name}
            value={value || new Date().toISOString().split('T')[0]}
            onChange={onHandleChange}
          />
        );
      }

      case 'range': {
        return (
          <input
            type={'range'}
            name={input.name}
            value={value || 0}
            onChange={onHandleChange}
            min="0"
            max="100"
          />
        );
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
        return (
          <CustomInput
            type={'text'}
            input={input}
            name={input.name}
            value={value}
            onChange={onHandleChange}
          />
        );
      }
    }
  };

  return <>{getInputByType()}</>;
};

export default FilterElement;
