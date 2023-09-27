import { pxToRem } from '../../utils/pxToRem';

export const styles = {
  menu: {
    elevation: 0,
    sx: {
      width: 358,
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 19,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
  badge: {
    paddingLeft: '22px ',
    '& span': { height: '30px', minWidth: '30px', borderRadius: '15px' },
  },
};
