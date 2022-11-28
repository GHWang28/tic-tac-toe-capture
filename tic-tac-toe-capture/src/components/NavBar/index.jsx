import { Alert, Box, Typography } from "@mui/material";

function NavBar ({ error, playerTurn, resetButton, undoButton, infoButton }) {
  return (
    <Box px={10} sx={{ width: '100%', display: 'flex', bgcolor: '#444c57', alignItems: 'center', position: 'relative', height: '6vh'}} >
      {(error) && (
        <Alert
          severity='error'
          variant='outlined'
          sx={{
            position: 'absolute',
            left: '50%',
            translate: '-50%',
            bgcolor: 'rgba(55,0,0,0.75)',
            maxWidth: '40vw'
          }}
        >
          <Typography fontSize={15} sx={{ color: 'whitesmoke' }} fontWeight={'bold'}>
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
      <Box my={0.5} mr={2}>
        <Typography fontSize={'2vh'} align='right'>
          {`Player ${playerTurn + 1}'s`}
        </Typography>
        <Typography fontWeight='bold' fontSize={'2vh'} align='right'>
          {'Turn'}
        </Typography>
      </Box>
      <Box ml={2}>
        {infoButton}
      </Box>
      <Box ml={2}>
        {undoButton}
      </Box>
      <Box ml={2}>
        {resetButton}
      </Box>
    </Box>
  )
}

export default NavBar;
