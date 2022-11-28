import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function CardContainer ({ children, isTurn, playerNo }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
        borderRadius: '15px',
        border: '1px solid whitesmoke',
        opacity: (isTurn) ? '1.0' : '0.25',
        transition: 'opacity 0.2s ease-out',
        pointerEvents: (isTurn) ? '' : 'none',
        position: 'relative'
      }}
    >
      {children}
      <Typography pl={2} pt={0.5} sx={{ zIndex: -1, position: 'absolute', top: 0, left: 0, opacity: 0.25 }} fontSize={'3vh'}>
        {`Player ${playerNo + 1}'s Cards`}
      </Typography>
    </Box>
  )
}

CardContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isTurn: PropTypes.bool,
  playerNo: PropTypes.number
}

export default CardContainer;
