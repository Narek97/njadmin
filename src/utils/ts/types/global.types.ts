export type Cookie = {
  name: string;
  value: string;
};

export type ObjectKeysType = {
  [key: string]: any;
};

export type MenuPanelType = {
  id: number;
  title: string;
  name: string;
  icon?: string;
  add_button?: boolean;
  subMenu?: Array<MenuPanelType>;
};

export type UserType = {
  id: number;
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  photo: string | null;
  role: 'admin' | string; // You can replace `string` with other roles if needed
  status: 'active' | string; // You can replace `string` with other statuses if needed
  user_type: 'admin' | string; // You can replace `string` with other user types if needed
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: {
    email: string;
  };
};

export type LoginType = {
  email: string;
  password: string;
};
