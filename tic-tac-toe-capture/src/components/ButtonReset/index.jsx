import { IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

function ButtonReset ({ onClick }) {
  return (
    <IconButton onClick={onClick} sx={{ color: 'white' }}>
      <RefreshIcon fontSize='large'/>
    </IconButton>
  )
}

export default ButtonReset;
