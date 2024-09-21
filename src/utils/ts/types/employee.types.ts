type UserStatus = {
  id: number;
  title: string;
  parent_id: number;
  locale: string;
};

type UserType = {
  id: number;
  title: string;
};

type User = {
  id: number;
  email: string;
  password: string;
  verify_token: string;
  refresh_token: string;
  access_token: string;
  created_at: string;
  updated_at: string;
};

export type EmployeeType = {
  cvs: null | string;
  id: number;
  user_id: number;
  name: string;
  last_name: string;
  country: null | string;
  city: null | string;
  street: null | string;
  summary: null | string;
  logo: null | string;
  date_of_birth: string;
  phone: null | string;
  code: null | string;
  driving_license: boolean;
  relocate: boolean;
  business_trip: boolean;
  gender: null | string;
  timezone: null | string;
  private: boolean;
  status: string;
  user_type: string;
  locale: null | string;
  prolonged: null | string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  phoneCode: null | string;
  userStatus: UserStatus;
  userType: UserType;
  lang: null | string;
  user: User;
};
