import { IconButton } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

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

export default ButtonReset;
