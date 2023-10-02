import { Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { FC } from 'react';
import Shop2Icon from '@mui/icons-material/Shop2';
import { INavItem } from '@/interfaces/INavItem';
import { styles } from './styles';

interface Props {
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  currentIndex: number;
  data: INavItem[];
}

const MenuOptions: FC<Props> = ({ anchorEl, handleClose, data, currentIndex }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={() => handleClose()}
      onClick={handleClose}
      PaperProps={styles.menu}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Typography variant='h6' sx={{ padding: '0 19px 4px', color: 'rgba(0, 0, 0, 0.87)' }}>
        {data[currentIndex].label}
      </Typography>
      <Divider sx={{ marginBottom: '6px' }} />

      {data[currentIndex].options.slice(0, 6).map((option, index: number) => (
        <MenuItem key={index} disabled={false} onClick={handleClose}>
          <ListItemIcon>
            <Shop2Icon fontSize='small' sx={{ mr: '6px', mt: '1px' }} />
          </ListItemIcon>
          {option}
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={handleClose}>
        View all {data[currentIndex].options.length} new order and quotes
      </MenuItem>
    </Menu>
  );
};

export default MenuOptions;
