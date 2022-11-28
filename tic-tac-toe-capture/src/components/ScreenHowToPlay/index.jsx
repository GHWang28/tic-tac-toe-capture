import { Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

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
        fontSize={'3vh'}
        align='center'
        sx={{
          textShadow: '2px 2px black',
        }}
      >
        {'How To Play'}
      </Typography>
      <Box
        component='img'
        alt='Capture Mechanic'
        src={'images/capture.png'}
      />
    </AnimatedBox>
  );
}

export default ScreenHowToPlay;
