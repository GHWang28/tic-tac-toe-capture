import React from 'react';
import { Box, Divider, Link, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

function NavBar ({ resetButton, undoButton, infoButton }) {
  const mq500 = useMediaQuery('(min-width:350px)');

  return (
    <Box px={10} sx={{ width: '100%', display: 'flex', bgcolor: '#444c57', alignItems: 'center', height: '8.5vh'}} >
      <Box my={0.5}>
        <Typography fontSize={'min(1.5vh,5.5vw)'} align='left'>
          {'Tic-Tac-Toe'}
        </Typography>
        <Typography fontWeight='bold' fontSize={'min(1.5vh,5.5vw)'} align='left'>
          {'Capture'}
        </Typography>
      </Box>
      <Divider flexItem sx={{ bgcolor: 'whitesmoke', mx: 1 }} orientation='vertical'/>
      {(mq500) && (
        <Typography fontSize={'min(1.5vh,4vw)'} align='left'>
          {'Developed by '}
          <Link color='rgb(127,199,198)' href='https://ghwang28.github.io/' target='_blank'>Gordon Wang</Link>
          {'.'}
        </Typography>
      )}
      {/* Game state related buttons */}
      <Box ml='auto'>{undoButton}</Box>
      <Box ml={1}>{resetButton}</Box>
      <Box ml={1}>{infoButton}</Box>
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
