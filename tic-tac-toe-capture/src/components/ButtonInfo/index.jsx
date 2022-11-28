import { IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

function ButtonInfo ({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{ color: 'white', border: '2px solid whitesmoke' }}
      title='How To Play'
    >
      <InfoIcon />
    </IconButton>
  )
}

export default ButtonInfo;
