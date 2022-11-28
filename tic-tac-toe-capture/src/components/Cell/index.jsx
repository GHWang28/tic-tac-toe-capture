import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function Cell ({ children, id, cellNo }) {
  const {isOver, setNodeRef} = useDroppable({
    id,
    data: {
      cellNo
    }
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        bgcolor: (isOver) ? 'rgba(255,255,255,0.25)' : '',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
  );
}

Cell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  id: PropTypes.string,
  cellNo: PropTypes.number
}

export default Cell;
