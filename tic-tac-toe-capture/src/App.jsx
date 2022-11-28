import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Box, Grid, Typography } from '@mui/material'
import { DndContext } from '@dnd-kit/core';
import CardPlayer from './components/CardPlayer';
import Cell from './components/Cell';
import CardContainer from './components/CardContainer';
import ButtonReset from './components/ButtonReset';
import useSound from 'use-sound';
import CardSfx from './sfx/card.ogg'

function App() {
  const dimension = 3;
  const totalPlayers = 2;
  const totalSizes = 3;
  const totalCardsPerSize = 2;
  const boardVisualDim = '60vh';

  const [play] = useSound(CardSfx);

  const [containerHeight, setContainerHeight] = useState(0);
  const ref = useRef(null);

  const [gameboard, setGameboard] = useState(Array(dimension * dimension).fill(null));
  const [usedCards, setUsedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(totalPlayers - 1);
  const [error, setError] = useState(null);


  // Update the height of the card containers
  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(ref?.current?.clientHeight);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  // App Structure
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
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        {/* Upper section */}
        <Box sx={{ width: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box px={10} sx={{ width: '100%', display: 'flex', bgcolor: '#444c57', alignItems: 'center', position: 'relative'}} >
            {(error) && (
              <Alert
                severity='error'
                variant='outlined'
                sx={{ position: 'absolute', left: '50%', translate: '-50%', bgcolor: 'rgba(55,0,0,0.75)'}}
              >
                <Typography sx={{ color: 'whitesmoke' }} fontWeight={'bold'}>
                  {error}
                </Typography>
              </Alert>
            )}
            <Typography fontSize={30} align='center' my={0.5} mr='auto'>
              {'Tic-Tac-Toe Capture'}
            </Typography>
            <Typography fontSize={20} align='center' my={0.5} ml='auto' mr={5}>
              {`Player ${playerTurn + 1}'s turn`}
            </Typography>
            <ButtonReset
              onClick={() => {
                setGameboard(Array(dimension * dimension).fill(null));
                setUsedCards([]);
                setPlayerTurn(0);
                setError(null);
              }}
            />
          </Box>
          {/* Grid containing the playing board */}
          <Grid
            container
            sx={{
              height: boardVisualDim,
              width: boardVisualDim,
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
                  height: `calc(${boardVisualDim} / ${dimension} )`
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
              <CardContainer isTurn={playerNo === playerTurn}>
                {/* Creating the totalSizes * totalCardsPerSize amount of cards */}
                {[...Array(totalSizes).keys()].map((size, index) => (
                  [...Array(totalCardsPerSize)].map((_, cardNo) => (
                    (!usedCards.includes(`card-${cardNo}-p${playerNo}-s${size}`)) && (
                      <CardPlayer
                        id={`card-${cardNo}-p${playerNo}-s${size}`}
                        size={size}
                        playerNo={playerNo}
                        key={`card-${cardNo}-p${playerNo}-s${size}`}
                        dim={containerHeight}
                        cardNo={(index * totalCardsPerSize) + cardNo}
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
      setError('You can not place a card over your own.')
      return;
    }

    // Checking if the placed cell already has a card placed
    // that is bigger
    if (gameboard[targetCellNo]?.size >= droppedCardData?.size) {
      setError('Your card is not big enough to be placed over this one.')
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
    setError(null);
    setUsedCards([...usedCards, active.id]);
    play();
  
    // Check game has been won
    const gameboardCopy = [...newGameboard];
    const gameboard2D = [];
    const [ placedX, placedY ] = [targetCellNo % dimension, Math.floor(targetCellNo / dimension)];
    while (gameboardCopy.length) gameboard2D.push(gameboardCopy.splice(0, dimension));

    // Checking the row of the last placed card
    for (let x = 0; x < dimension; x++){
      if (gameboard2D[placedY][x]?.playerNo !== playerTurn) break;
      if (x === dimension - 1) console.log(`player ${playerTurn} wins`)
    }
    // Checking the column of the last placed card
    for (let y = 0; y < dimension; y++){
      if (gameboard2D[y][placedX]?.playerNo !== playerTurn) break;
      if (y === dimension - 1) console.log(`player ${playerTurn} wins`)
    }
    // Checking diagonal top left to bottom right
    if (placedX === placedY) {
      for (let coord = 0; coord < dimension; coord++){
        if (gameboard2D[coord][coord]?.playerNo !== playerTurn) break;
        if (coord === dimension - 1) console.log(`player ${playerTurn} wins`)
      }
    }
    // Checking diagonal top right to bottom right
    if (placedX + placedY === dimension - 1) {
      for (let coord = 0; coord < dimension; coord++){
        if (gameboard2D[coord][(dimension - 1) - coord]?.playerNo !== playerTurn) break;
        if (coord === dimension - 1) console.log(`player ${playerTurn} wins`)
      }
    }
    setPlayerTurn((playerTurn + 1) % totalPlayers);
  }
}

export default App;
