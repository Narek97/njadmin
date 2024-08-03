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
  icon?: string;
  addButton?: boolean;
  subMenu?: Array<MenuPanelType>;
};
