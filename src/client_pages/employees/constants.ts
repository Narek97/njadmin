import { v4 as uuidv4 } from 'uuid';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';

const getMaxBirthDate = (): string => {
  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return tenYearsAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const formInputs = ({
  countries,
  codes,
  statuses,
  userTypes,
  locale,
}: {
  countries: Array<{ id: number; name: string; type: string }>;
  codes: Array<{ id: number; name: string; code: string }>;
  statuses: Array<{ id: number; title: string }>;
  userTypes: Array<{ id: number; title: string }>;
  locale: Array<{ id: number; code: string; title: string }>;
}) => [
  {
    id: uuidv4(),
    name: 'name',
    type: InputTypeEnum.Text,
    attr: {
      label: 'Name',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {
      required: 'This field is required',
    },
  },
  {
    id: uuidv4(),
    name: 'last_name',
    type: InputTypeEnum.Text,
    attr: {
      label: 'Surname',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'country',
    type: InputTypeEnum.Autocomplete,
    attr: {
      label: 'Country',
    },
    useInUpdate: true,
    useInCreation: true,
    options: countries,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'city',
    type: InputTypeEnum.Autocomplete,
    attr: {
      label: 'City',
    },
    useInUpdate: true,
    useInCreation: true,
    options: countries,
    validation: {},
  },

  {
    id: uuidv4(),
    name: 'street',
    type: InputTypeEnum.Text,
    attr: {
      label: 'Street',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'summary',
    type: InputTypeEnum.Text,
    attr: {
      label: 'Summary',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'date_of_birth',
    type: InputTypeEnum.Date,
    attr: {},
    inputProps: {
      max: getMaxBirthDate(),
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'phone',
    type: InputTypeEnum.Number,
    attr: {
      label: 'Phone',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'code',
    type: InputTypeEnum.Select,
    attr: {
      label: 'Code',
    },
    useInUpdate: true,
    useInCreation: true,
    options: codes,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'status',
    type: InputTypeEnum.Select,
    attr: {
      label: 'Status',
    },
    requiredField: 'title',
    useInUpdate: true,
    useInCreation: true,
    options: statuses,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'user_type',
    type: InputTypeEnum.Select,
    attr: {
      label: 'User type',
    },
    requiredField: 'title',
    useInUpdate: true,
    useInCreation: true,
    options: userTypes,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'locale',
    type: InputTypeEnum.Select,
    attr: {
      label: 'Locale',
    },
    useInUpdate: true,
    useInCreation: true,
    options: locale,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'driving_license',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Driving license',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'relocate',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Relocate',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'business_trip',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Business trip',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'private',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Private',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'prolonged',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Prolonged',
    },
    useInUpdate: true,
    useInCreation: true,
    validation: {},
  },
];

//         user_id: number, // required
//         logo: string, // single upload
//         timezone: string,
//         cvs: string, // multi file upload
//         gender: string,
