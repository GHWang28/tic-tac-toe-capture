import { Box } from '@mui/material';
import React from 'react';

function CardContainer ({ children, ref }) {
  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '15px',
        border: '1px solid whitesmoke'
      }}
    >
      
      {children}
    </Box>
  )
}

export default CardContainer;
