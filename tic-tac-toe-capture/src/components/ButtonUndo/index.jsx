import { IconButton } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';

function ButtonUndo ({ onClick, disabled }) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      sx={{ color: 'white', border: '2px solid whitesmoke' }}
      title='Reverses the immediate previous move'
    >
      <UndoIcon />
    </IconButton>
  )
}

export default ButtonUndo;
