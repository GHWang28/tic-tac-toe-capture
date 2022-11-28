import { IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

function ButtonReset ({ onClick }) {
  return (
    <IconButton onClick={onClick} sx={{ color: 'white', border: '2px solid whitesmoke' }} title='Reset Game'>
      <RefreshIcon fontSize='large'/>
    </IconButton>
  )
}

export default ButtonReset;
