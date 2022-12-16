import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function NavBar ({ resetButton, undoButton, infoButton }) {
  
  return (
    <Box px={10} sx={{ width: '100%', display: 'flex', bgcolor: '#444c57', alignItems: 'center', height: '8.5vh'}} >
      <Box my={0.5} mr='auto'>
        <Typography fontSize={'min(2vh,6vw)'} align='left'>
          {'Tic-Tac-Toe'}
        </Typography>
        <Typography fontWeight='bold' fontSize={'min(2vh,6vw)'} align='left'>
          {'Capture'}
        </Typography>
      </Box>
      <Box ml={1}>
        {undoButton}
      </Box>
      <Box ml={1}>
        {resetButton}
      </Box>
      <Box ml={1}>
        {infoButton}
      </Box>
    </Box>
  )
}

NavBar.propTypes = {
  error: PropTypes.string,
  resetButton: PropTypes.element,
  undoButton: PropTypes.element,
  infoButton: PropTypes.element
}

export default NavBar;
