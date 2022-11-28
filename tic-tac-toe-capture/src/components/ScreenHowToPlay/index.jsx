import { Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import InfoIcon from '@mui/icons-material/Info';

function ScreenHowToPlay () {
  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox
      style={useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
      })}
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
        fontSize={'2.5vh'}
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
        mt={1}
        fontSize={'2vh'}
        align='center'
      >
        {'Like with classic Tic Tac Toe, get a line of three to win.'}
      </Typography>
      <Box
        sx={{ height: '35%' }}
        component='img'
        alt='How to Win'
        src={'images/capture.png'}
      />
      <Typography
        mt={1}
        fontSize={'2vh'}
        align='center'
      >
        {'You can capture your opponent\'s cards by placing a bigger card over your opponent\'s card.'}
      </Typography>
      <Typography
        mt={2}
        fontSize={'1.7vh'}
        align='center'
      >
        {'(Click the '}
        <InfoIcon fontSize='small' />
        {' to close this message)'}
      </Typography>
    </AnimatedBox>
  );
}

export default ScreenHowToPlay;
