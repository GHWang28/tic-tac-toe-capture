import { Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import PropTypes from 'prop-types';

function ScreenDraw ({ resetButton }) {
  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox
      style={useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 1500
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
        fontSize={'8vh'}
        align='center'
        sx={{
          textShadow: '2px 2px black',
        }}
      >
        {'Draw'}
      </Typography>
      {resetButton}
    </AnimatedBox>
  );
}

ScreenDraw.propTypes = {
  resetButton: PropTypes.element
}

export default ScreenDraw;
