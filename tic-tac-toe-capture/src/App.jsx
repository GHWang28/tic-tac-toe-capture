import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material'
import { DndContext } from '@dnd-kit/core';
import CardPlayer from './components/CardPlayer';
import Cell from './components/Cell';
import CardContainer from './components/CardContainer';
import ButtonReset from './components/ButtonReset';

function App() {
  const dimension = 3;
  const totalPlayers = 2;
  const totalSizes = 3;
  const totalCardsPerSize = 2;
  const dim = '60vh';

  const [containerHeight, setContainerHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(ref?.current?.clientHeight);
      console.log('height: ', ref?.current?.clientHeight);
    }
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
  }, []);

  const [gameboard, setGameboard] = useState(Array(dimension * dimension).fill(null));
  const [usedCards, setUsedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(0);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        name='game-container'
        sx={{
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}
      >
        {/* Grid cotaining the tic tac toes */}
        <Box sx={{ width: '98vw', display: 'flex' }}>
          <Box sx={{ width: `calc((100% - ${dim}) / 2)`}} >
            <Typography fontSize={30} align='center' my={5}>
              {`Player ${playerTurn + 1}'s turn`}
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              height: dim,
              width: dim,
              border: '1px solid whitesmoke',
              borderRadius: '15px',
              overflow: 'hidden'
            }}
          >
            {[...Array(dimension * dimension)].map((_, index) => (
              <Grid
                key={`cell-${index}`}
                item
                xs={ 12 / dimension }
                sx={{
                  border: '1px solid whitesmoke',
                  height: `calc(${dim} / ${dimension} )`
                  // bgcolor: (index % 2) ? 'rgba(255,255,255,0.1)' : ''
                }}
              >
                <Cell id={`cell-id-${index}`} cellNo={index}>
                  {(gameboard[index]) && (
                    <CardPlayer
                      {...gameboard[index]}
                      disabled={true}
                      dim={containerHeight}
                    />
                  )}
                </Cell>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ width: `calc((100% - ${dim}) / 2)` }} >
            <ButtonReset
              onClick={() => {
                setGameboard(Array(dimension * dimension).fill(null));
                setUsedCards([]);
                setPlayerTurn(0);
              }}
            />
          </Box>
        </Box>
        
        {/* Bottom row with cards */}
        <Box
          sx={{
            flexGrow: 1,
            width: '98vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          {([...Array(totalPlayers)].map((_, playerNo) => (
            <Box key={`player-${playerNo}-cards`} ref={ref} sx={{ height: `${(100 / totalPlayers) - 5}%` }}>
              <CardContainer>
                {/* Creating the totalSizes * totalCardsPerSize amount of cards */}
                {[...Array(totalSizes).keys()].map((size) => (
                  [...Array(totalCardsPerSize)].map((_, cardNo) => (
                    (!usedCards.includes(`card-${cardNo}-p${playerNo}-s${size}`)) && (
                      <CardPlayer
                        id={`card-${cardNo}-p${playerNo}-s${size}`}
                        size={size}
                        playerNo={playerNo}
                        key={`card-${cardNo}-p${playerNo}-s${size}`}
                        dim={containerHeight}
                      />
                    )
                  ))
                ))}
              </CardContainer>
            </Box>
          )))}
        </Box>
      </Box>
    </DndContext>
  );

  // Game logic
  function handleDragEnd ({ over, active }) {
    if (!over) return;

    const targetCellNo = over.data.current.cellNo;
    const droppedCardData =  active?.data?.current;

    if (gameboard[targetCellNo]?.playerNo === droppedCardData?.playerNo) {
      return;
    }

    // Checking if the placed cell already has a card placed
    // that is bigger
    if (gameboard[targetCellNo]?.size >= droppedCardData?.size) {
      return;
    }

    // Update the board with the newly placed card
    const newGameboard = [...gameboard];
    newGameboard[targetCellNo] = {
      id: active?.id,
      size: droppedCardData?.size,
      playerNo: droppedCardData?.playerNo,
    }
    setGameboard(newGameboard);
    setUsedCards([...usedCards, active.id]);
    setPlayerTurn((playerTurn + 1) % totalPlayers);
  }
}

export default App;
