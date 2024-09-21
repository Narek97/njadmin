import { v4 as uuidv4 } from 'uuid';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';

// user_id: number, // required
//   name: string, // required
//   last_name: string, // required
//   country: number,
//   city: number,
//   street: string,
//   summary: string,
//   logo: string, // single upload
//   date_of_birth: string, // required
//   phone: string,
//   code: string,
//   driving_license: boolean,
//   relocate: boolean,
//   business_trip: boolean,
//   timezone: string,
//   private: boolean,
//   cvs: string, // multi file upload
//   status: string,
//   user_type: string,
//   gender: string,
//   locale: string,
//   prolonged: boolean,

export const formInputs = (relations: any) => [
  {
    id: uuidv4(),
    name: 'title',
    type: InputTypeEnum.Text,
    attr: {
      placeholder: 'Title...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'age',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'Age...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'status',
    type: InputTypeEnum.Select,
    attr: {
      placeholder: 'Age...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
    options: relations.statuses,
  },
  {
    id: uuidv4(),
    name: 'desc',
    type: InputTypeEnum.Quill,
    attr: {
      placeholder: 'Quill...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'skills',
    type: InputTypeEnum.Array,
    attr: {
      placeholder: 'Age...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'check',
    type: InputTypeEnum.Checkbox,
    attr: {
      placeholder: 'check...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'date',
    type: InputTypeEnum.Date,
    attr: {
      placeholder: 'Age...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
];
