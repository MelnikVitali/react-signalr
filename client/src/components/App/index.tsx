import { useEffect, useState } from 'react';
import Connector from '@/services/signalr-connection';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { navItems } from '@/data/navItems';
import ButtonGroup from '@/components/ButtonGroup';
import NavButton from '@/components/NavButton';
import { INavItem } from '@/interfaces/INavItem';
import { IMessageHub } from '@/interfaces/IMessageHub';
import { getDateNow } from '@/helpers/getDateNow';
import { getNewData } from '@/helpers/getNewData';
import { styles } from './styles';

const App = () => {
  const [data, setData] = useState<INavItem[]>(navItems);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState<IMessageHub | string>('');

  //connect to @microsoft/signalR
  const { newMessage1, events1, newMessage2, events2 } = Connector();

  useEffect(() => {
    events1((_, message: IMessageHub) => {
      const newData: INavItem[] = getNewData(data, message);
      setData(newData);
      setMessage(message);
    });

    events2((_, message) => {
      const newData: INavItem[] = getNewData(data, message);
      setData(newData);
      setMessage(message);
    });
  }, [message]);

  const handleSendMessageFirstHub = (_event: React.MouseEvent<HTMLElement>, index: number) => {
    const json = JSON.stringify({ message: `New order from qashop2 @ ${getDateNow()}`, id: index });

    newMessage1(json);
  };

  const handleSendMessageSecondHub = (_event: React.MouseEvent<HTMLElement>, index: number) => {
    const json = JSON.stringify({ message: `New order from qashop2 @ ${getDateNow()}`, id: index });

    newMessage2(json);
  };

  const handleClickMenuBtn = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
    setActiveBtn(index);
  };

  const handleCloseMenuBtn = () => {
    setActiveBtn(null);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar component='nav' position='relative' sx={{ minHeight: '0px' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={styles.typography} />
          <Box sx={{ display: { sm: 'block' } }}>
            {data.map((item, index) => (
              <NavButton
                key={item.title + index}
                index={index}
                item={item}
                anchorEl={anchorEl}
                activeBtn={activeBtn}
                handleClose={handleCloseMenuBtn}
                data={data}
                currentIndex={currentIndex}
                handleClick={handleClickMenuBtn}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={styles.btnGroupContainer}>
        Message from signalR:{' '}
        <span style={{ color: 'green' }}>
          {message && JSON.parse(message as unknown as string)?.message}
        </span>
        <ButtonGroup handler={handleSendMessageFirstHub} color='info' numberHub='1hub' />
        <ButtonGroup handler={handleSendMessageSecondHub} color='primary' numberHub='2hub' />
      </Box>
    </>
  );
};

export default App;
