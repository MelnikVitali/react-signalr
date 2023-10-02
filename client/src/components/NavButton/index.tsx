import { Badge, Button, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
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
  activeBtn: number | null;
}

const NavButton: FC<Props> = ({
  anchorEl,
  handleClick,
  handleClose,
  data,
  currentIndex,
  item,
  index,
  activeBtn,
}) => {
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title='Open notifications' arrow>
        <Button
          onClick={(e) => handleClick(e, index)}
          sx={{
            ...styles.btn,
            backgroundColor: `${activeBtn !== null && activeBtn == index ? '#36558D' : 'primary'}`,
          }}
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
