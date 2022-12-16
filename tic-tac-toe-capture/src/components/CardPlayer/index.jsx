import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';

function CardPlayer({ id, size, playerNo, disabled = false, cardNo = 0 }) {

  const animationProps = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay: cardNo * 75
  })
  const placeAnimationProps = useSpring({
    from: { scale: 1.05 },
    to: { scale: 1 },
  })

  // Clears the animation props so that it can be dragged around
  const [animationFinish, setAnimationFinish] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationFinish(true);
    }, (cardNo + 1) * 200);

    return () => { clearTimeout(timeout) };
  }, [cardNo])

  const AnimatedBox = animated(Box);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
    data: {
      size,
      playerNo
    },
    disabled
  });

  /**
   * Gets the symbol depending on the player number
   */
  const getSymbol = () => {
    switch (playerNo) {
      case 1: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'currentColor\' class=\'bi bi-x\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\'/%3E%3C/svg%3E")'
      default: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'currentColor\' class=\'bi bi-circle\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\'/%3E%3C/svg%3E")'
    }
  }

  const getColor = () => {
    switch (playerNo) {
      case 0: return 'rgba(185, 239, 164, 0.75)';
      case 1: return 'rgba(150, 246, 246, 0.75)';
      default: return '#444c57';
    }
  }

  const calcDim = () => {
    switch (size) {
      case 0: return 'min(9vw,4vh)';
      case 1: return 'min(14vw,9vh)';
      default: return 'min(22vw,14vh)';
    }
  }

  return (
    <AnimatedBox
      style={(!animationFinish) ? ((disabled) ? placeAnimationProps : animationProps) : null}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        transform: CSS.Translate.toString(transform),
        bgcolor: getColor(),
        width: calcDim(),
        height: calcDim(),
        border: '1px solid whitesmoke',
        cursor: (disabled) ? 'default' : 'pointer',
        borderRadius: '2vh',
        backgroundImage: getSymbol(),
        backgroundSize: '75% 75%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}
    />
  );
}

CardPlayer.propTypes = {
  id: PropTypes.string,
  size: PropTypes.number,
  playerNo: PropTypes.number,
  disabled: PropTypes.bool,
  dim: PropTypes.number,
  cardNo: PropTypes.number
}

export default CardPlayer;
