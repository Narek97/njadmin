import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IMenu {
  menuItem: any;
  options: { option: any; onCLick: (menuItem: any) => void }[];
  slotPropsStyle?: React.CSSProperties;
}
// const ITEM_HEIGHT = 48;
const LongMenu: FC<IMenu> = ({ menuItem, options, slotPropsStyle }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              ...slotPropsStyle,
              // maxHeight: ITEM_HEIGHT * 4.5,
              // width: '20ch',
            },
          },
        }}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.onCLick(menuItem);
              handleClose();
            }}>
            {option.option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LongMenu;
