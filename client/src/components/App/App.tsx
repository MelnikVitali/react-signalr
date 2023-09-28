import { useEffect, useState } from 'react';
import Connector from '../../services/signalr-connection';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Shop2Icon from '@mui/icons-material/Shop2';
import { styles } from './styles';
import { navItems } from '../../data/navItems';
import { INavItem } from '../../interfaces/INavItem';

const App = () => {
  const [data, setData] = useState<INavItem[]>(navItems);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { newMessage, events } = Connector();
  const [message, setMessage] = useState('');

  const open = Boolean(anchorEl);
  const date = new Date();
  const dateNow = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  useEffect(() => {
    events((_, message) => {
      const newData = data.map((obj, i) => {
        const idMessage = JSON.parse(message).id;
        const messageFromMessage = JSON.parse(message).message;
        if (i === idMessage) {
          const newOptions = [messageFromMessage, ...obj.options];
          return { ...obj, options: newOptions };
        }
        return obj;
      });

      setData(newData);
      setMessage(message);
    });
  }, [message]);

  const handleSendMessage = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const json = JSON.stringify({ message: `New order from qashop2 @ ${dateNow}`, id: index });

    newMessage(json);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
  };
  const handleClose = (event?: React.MouseEvent<HTMLElement>, index?: number) => {
    setAnchorEl(null);
  };

  return (
    <div className='app'>
      <AppBar component='nav' sx={{ minHeight: '0px' }}>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          ></Typography>
          <Box sx={{ display: { sm: 'block' } }}>
            {data.map((item, index) => (
              <span key={item.title + index}>
                <Tooltip title='Account settings'>
                  <Button
                    onClick={(e) => handleClick(e, index)}
                    sx={{
                      color: '#fff',
                      textTransform: 'capitalize',
                      paddingRight: ' 24px',
                      paddingLeft: '14px',
                    }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                  >
                    {item.title}
                    <Badge
                      badgeContent={item.options.length}
                      color='error'
                      max={99}
                      sx={styles.badge}
                    />
                  </Button>
                </Tooltip>
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
                  <Typography
                    variant='h6'
                    sx={{ padding: '0 19px 4px', color: 'rgba(0, 0, 0, 0.87)' }}
                  >
                    {data[currentIndex].label}
                  </Typography>
                  <Divider sx={{ marginBottom: '6px' }} />
                  {data[currentIndex].options.slice(0, 4).map((option, index: number) => (
                    <MenuItem
                      key={index}
                      disabled={false}
                      onClick={(event) => handleClose(event, index)}
                    >
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
              </span>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ margin: '400px auto', textAlign: 'center' }}>
        Message from signalR:{' '}
        <span style={{ color: 'green' }}>{message && JSON.parse(message)?.message}</span>
        <Stack direction='row' justifyContent='center' spacing={2} mt={2}>
          <Button
            variant='contained'
            sx={{ textTransform: 'capitalize' }}
            onClick={(e) => handleSendMessage(e, 0)}
          >
            add to D2DLink
          </Button>
          <Button
            variant='contained'
            sx={{ textTransform: 'capitalize' }}
            onClick={(e) => handleSendMessage(e, 1)}
          >
            add to CollisionLink
          </Button>
          <Button
            variant='contained'
            sx={{ textTransform: 'capitalize' }}
            onClick={(e) => handleSendMessage(e, 2)}
          >
            add to MarketplaceDirect
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default App;
