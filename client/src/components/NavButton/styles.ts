import { pxToRem } from '../../utils/pxToRem';

export const styles = {
  btn: {
    color: '#fff',
    textTransform: 'capitalize',
    paddingRight: ' 24px',
    paddingLeft: '14px',
    minHeight: '64px',
    '&:hover': {
      backgroundColor: '#36558D',
    },
  },
  badge: {
    paddingLeft: '22px ',
    '& span': { height: '30px', minWidth: '30px', borderRadius: '15px' },
  },
};
