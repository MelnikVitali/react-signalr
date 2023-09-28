import { Badge, Button, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import MenuOptions from '@/components/MenuOptions';
import { INavItem } from '@/interfaces/INavItem';
import { styles } from './styles';

interface Props {
  handleClose: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  anchorEl: null | HTMLElement;
  currentIndex: number;
  data: INavItem[];
  item: INavItem;
  index: number;
}

const NavButton: FC<Props> = ({
  anchorEl,
  handleClick,
  handleClose,
  data,
  currentIndex,
  item,
  index,
}) => {
  const open = Boolean(anchorEl);
  return (
    <>
      <Tooltip title='Account settings'>
        <Button
          onClick={(e) => handleClick(e, index)}
          sx={styles.btn}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          {item.title}
          <Badge badgeContent={item.options.length} color='error' max={99} sx={styles.badge} />
        </Button>
      </Tooltip>
      <MenuOptions
        anchorEl={anchorEl}
        handleClose={handleClose}
        data={data}
        currentIndex={currentIndex}
      />
    </>
  );
};

export default NavButton;
