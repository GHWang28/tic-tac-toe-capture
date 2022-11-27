import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';

function CardPlayer({ id, size, playerNo, disabled = false, dim }) {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
    data: {
      size,
      playerNo
    },
    disabled
  });

  const getSymbol = () => {
    switch (playerNo) {
      case 1: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'currentColor\' class=\'bi bi-x\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\'/%3E%3C/svg%3E")'
      default: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'currentColor\' class=\'bi bi-circle\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\'/%3E%3C/svg%3E")'
    }
  }

  const calcDim = () => {
    switch (size) {
      case 0: return 0.25 * dim;
      case 1: return 0.55 * dim;
      default: return 0.85 * dim;
    }
  }

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        transform: CSS.Translate.toString(transform),
        transition: 'transform 0.05s ease-out',
        bgcolor: '#444c57',
        width: calcDim(),
        height: calcDim(),
        border: '1px solid whitesmoke',
        borderRadius: '15px',
        backgroundImage: getSymbol(),
        backgroundSize: '75% 75%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}
    />
  );
}

export default CardPlayer;
