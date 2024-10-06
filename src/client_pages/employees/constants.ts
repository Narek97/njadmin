import { v4 as uuidv4 } from 'uuid';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';

const getMaxBirthDate = (): string => {
  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return tenYearsAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const formInputs = ({
  countries,
  city,
  codes,
  statuses,
  userTypes,
  locale,
}: {
  countries: Array<{ id: number; name: string; type: string }>;
  city: Array<{ id: number; name: string; type: string }>;
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
    useOnUpdate: false,
    useOnCreate: true,
    useOnPreview: true,
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
    useOnUpdate: true,
    useOnCreate: false,
    useOnPreview: false,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'country',
    type: InputTypeEnum.Autocomplete,
    attr: {
      label: 'Country',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
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
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    options: city,
    validation: {},
  },

  {
    id: uuidv4(),
    name: 'street',
    type: InputTypeEnum.Text,
    attr: {
      label: 'Street',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'summary',
    type: InputTypeEnum.Text,
    attr: {
      label: 'Summary',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'date_of_birth',
    type: InputTypeEnum.Date,
    attr: {
      label: 'Birth day',
    },
    inputProps: {
      max: getMaxBirthDate(),
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'phone',
    type: InputTypeEnum.Number,
    attr: {
      label: 'Phone',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'code',
    type: InputTypeEnum.Select,
    attr: {
      label: 'Code',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
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
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
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
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
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
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
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
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'relocate',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Relocate',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'business_trip',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Business trip',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'private',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Private',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
  {
    id: uuidv4(),
    name: 'prolonged',
    type: InputTypeEnum.Checkbox,
    attr: {
      label: 'Prolonged',
    },
    useOnUpdate: true,
    useOnCreate: true,
    useOnPreview: true,
    validation: {},
  },
];

//         user_id: number, // required
//         logo: string, // single upload
//         timezone: string,
//         cvs: string, // multi file upload
//         gender: string,
