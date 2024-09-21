import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import { v4 as uuidv4 } from 'uuid';

export const formInputs = [
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
    name: 'company_id',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'Company...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'country',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'Country...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'city',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'City...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'job_type',
    type: InputTypeEnum.Select,
    attr: {
      placeholder: 'Job type...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'payment_type',
    type: InputTypeEnum.Select,
    attr: {
      placeholder: 'Payment type...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'industry',
    type: InputTypeEnum.Select,
    attr: {
      placeholder: 'Industry...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'description',
    type: InputTypeEnum.Quill,
    attr: {
      placeholder: 'Description...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'pay_from',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'Pat from...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'pay_to',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'Pay to...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'compensation',
    type: InputTypeEnum.Quill,
    attr: {
      placeholder: 'Compensation...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'benefits',
    type: InputTypeEnum.Quill,
    attr: {
      placeholder: 'benefits...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'responsibilites',
    type: InputTypeEnum.Quill,
    attr: {
      placeholder: 'responsibilites...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'qualifications',
    type: InputTypeEnum.Quill,
    attr: {
      placeholder: 'qualifications...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'email',
    type: InputTypeEnum.Text,
    attr: {
      placeholder: 'email...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'department',
    type: InputTypeEnum.Text,
    attr: {
      placeholder: 'department...',
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
      placeholder: 'skills...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'urgently',
    type: InputTypeEnum.Number,
    attr: {
      placeholder: 'urgently...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'multi_candidate',
    type: InputTypeEnum.Checkbox,
    attr: {
      placeholder: 'multi_candidate...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'deadline',
    type: InputTypeEnum.Date,
    attr: {
      placeholder: 'deadline...',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
];
