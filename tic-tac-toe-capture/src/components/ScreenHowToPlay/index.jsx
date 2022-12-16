import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTransition, animated } from 'react-spring';
import InfoIcon from '@mui/icons-material/Info';

function ScreenHowToPlay ({ display }) {
  const AnimatedBox = animated(Box);
  const transitions = useTransition(display, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions((style, item) => (
    item ? (
      <AnimatedBox
        style={style}
        sx={{
          backdropFilter: 'blur(7px)',
          zIndex: 2,
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Typography
          fontSize={'3.5vh'}
          align='center'
          sx={{
            textShadow: '2px 2px black',
          }}
          mb={1.5}
        >
          {'How To Play'}
        </Typography>
        <Box
          sx={{ height: '30%' }}
          component='img'
          alt='Capture Mechanic'
          src={'images/win.jpg'}
        />
        <Typography
          mt={'0.5vh'}
          fontSize={'2vh'}
          align='center'
        >
          {'Drag one of your cards over a cell and get a line of three to win.'}
        </Typography>
        <Box
          sx={{ height: '20%' }}
          component='img'
          alt='How to Win'
          src={'images/capture.png'}
        />
        <Typography
          mt={'0.5vh'}
          fontSize={'2vh'}
          align='center'
        >
          {'You can capture your opponent\'s cards by placing a bigger card over your opponent\'s card.'}
        </Typography>
        <Typography
          mt={'1vh'}
          fontSize={'1.7vh'}
          align='center'
        >
          {'(Click the '}
          <InfoIcon fontSize='small' />
          {' to close this message)'}
        </Typography>
      </AnimatedBox>
    ) : (
      null
    )
  ))
}

export default ScreenHowToPlay;
