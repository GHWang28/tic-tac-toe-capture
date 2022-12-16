import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import PropTypes from 'prop-types';

function ButtonReset ({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{ color: 'white', border: '2px solid whitesmoke' }}
      title='Reset Game'
    >
      <ReplayIcon />
    </IconButton>
  )
}

ButtonReset.propTypes = {
  onClick: PropTypes.func
}

export default ButtonReset;
