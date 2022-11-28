import { Alert, Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';

function NavBar ({ error, resetButton, undoButton, infoButton }) {
  return (
    <Box px={10} sx={{ width: '100%', display: 'flex', bgcolor: '#444c57', alignItems: 'center', position: 'relative', height: '7vh'}} >
      {(error) && (
        <Alert
          severity='error'
          variant='outlined'
          sx={{
            position: 'absolute',
            left: '50%',
            translate: '-50%',
            bgcolor: 'rgba(55,0,0,0.75)',
            maxWidth: '40vw',
            maxHeight: '100%'
          }}
        >
          <Typography fontSize={'1.5vh'} sx={{ color: 'whitesmoke' }} fontWeight={'bold'}>
            {error}
          </Typography>
        </Alert>
      )}
      <Box my={0.5} mr='auto'>
        <Typography fontSize={'2vh'} align='left'>
          {'Tic-Tac-Toe'}
        </Typography>
        <Typography fontWeight='bold' fontSize={'2vh'} align='left'>
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
