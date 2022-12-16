import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import PropTypes from 'prop-types';

function ButtonUndo ({ onClick, disabled }) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      sx={{ color: 'white', border: (disabled) ? '2px solid gray' : '2px solid whitesmoke' }}
      title='Reverses the immediate previous move'
    >
      <UndoIcon />
    </IconButton>
  )
}

ButtonUndo.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default ButtonUndo;
