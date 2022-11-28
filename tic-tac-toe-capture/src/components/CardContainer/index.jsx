import { Box } from '@mui/material';
import React from 'react';

function CardContainer ({ children, isTurn }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        alignItems: 'center',
        borderRadius: '15px',
        border: '1px solid whitesmoke',
        opacity: (isTurn) ? '1.0' : '0.5',
        transition: 'opacity 0.2s ease-out',
        pointerEvents: (isTurn) ? '' : 'none',
      }}
    >
      {children}
    </Box>
  )
}

export default CardContainer;
