import { IconButton } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';

function ButtonUndo ({ onClick, disabled }) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      sx={{ color: 'white', border: '2px solid whitesmoke' }}
      title='Undo the immediate previous move'
    >
      <UndoIcon fontSize='large'/>
    </IconButton>
  )
}

export default ButtonUndo;
