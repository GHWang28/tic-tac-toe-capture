import { Box, Typography } from "@mui/material";
import { useTransition, animated } from "react-spring";
import PropTypes from 'prop-types';

function ScreenDraw ({ resetButton, display }) {
  const AnimatedBox = animated(Box);
  const transitions = useTransition(display, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 1000
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
    ) : (
      null
    )
  ));
}

ScreenDraw.propTypes = {
  resetButton: PropTypes.element
}

export default ScreenDraw;
