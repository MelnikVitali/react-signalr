import { Button, Stack, ButtonProps } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  numberHub: string;
  handler: (e: React.MouseEvent<HTMLElement>, index: number) => void;
} & ButtonProps;

const ButtonGroup: FC<Props> = ({ handler, numberHub, ...otherProps }) => {
  return (
    <Stack direction='row' justifyContent='center' spacing={2} mt={2}>
      <Button
        variant='contained'
        {...otherProps}
        sx={{ textTransform: 'none' }}
        onClick={(e) => handler(e, 0)}
      >
        add to D2DLink {numberHub}
      </Button>
      <Button
        {...otherProps}
        variant='contained'
        sx={{ textTransform: 'none' }}
        onClick={(e) => handler(e, 1)}
      >
        add to CollisionLink {numberHub}
      </Button>
      <Button
        variant='contained'
        {...otherProps}
        sx={{ textTransform: 'none' }}
        onClick={(e) => handler(e, 2)}
      >
        add to MarketplaceDirect {numberHub}
      </Button>
    </Stack>
  );
};

export default ButtonGroup;
