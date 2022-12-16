import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import CardPlayer from './components/CardPlayer';
import Cell from './components/Cell';
import CardContainer from './components/CardContainer';
import ButtonReset from './components/ButtonReset';
import useSound from 'use-sound';
import ScreenGameOver from './components/ScreenGameOver';
import NavBar from './components/NavBar';

import CardSfx from './sfx/card.ogg'
import ErrorSfx from './sfx/error.ogg'
import ButtonUndo from './components/ButtonUndo';
import ScreenHowToPlay from './components/ScreenHowToPlay';
import ButtonInfo from './components/ButtonInfo';
import ScreenDraw from './components/ScreenDraw';
import { toast } from 'react-toastify';

const DRAW = -999999;
const dimension = 3;
const totalPlayers = 2;
const totalSizes = 3;
const totalCardsPerSize = 2;
const boardVisualDim = 'min(60vh,95vw)';

const genCardID = (number, size, player) => (
  JSON.stringify({
    number,
    size,
    player
  })
)

function App() {
  
  const allCards = [];
  [...Array(totalPlayers).keys()].forEach((playerNo) => {
    [...Array(totalSizes).keys()].forEach((size) => {
      [...Array(totalCardsPerSize).keys()].forEach((cardNo) => {
        allCards.push(genCardID(cardNo, size, playerNo));
      })
    })
  })

  // Sensors
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  // Sound
  const [playCardSfx] = useSound(CardSfx);
  const [playErrorSfx] = useSound(ErrorSfx);

  // States and hooks
  const [gameboard, setGameboard] = useState(Array(dimension * dimension).fill(null));
  const [prevGameboard, setPrevGameboard] = useState(Array(dimension * dimension).fill(null));
  const [prevUsedCards, setPrevUsedCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [winner, setWinner] = useState(-1);
  const [letUndo, setLetUndo] = useState(false);
  const [showInfoScreen, setShowInfoScreen] = useState(false);

  const resetButton = (
    <ButtonReset
      onClick={() => {
        setGameboard(Array(dimension * dimension).fill(null));
        setUsedCards([]);
        setPlayerTurn(0);
        setWinner(-1);
      }}
    />
  )

  const undoButton = (
    <ButtonUndo
      disabled={ !letUndo }
      onClick={() => {
        setLetUndo(false);
        setGameboard([...prevGameboard]);
        setUsedCards([...prevUsedCards]);
        setPlayerTurn((((playerTurn - 1) % totalPlayers) + totalPlayers) % totalPlayers);
      }}
    />
  )

  const infoButton = (
    <ButtonInfo
      onClick={() => {
        setShowInfoScreen(!showInfoScreen);
      }}
    />
  )

  // App Structure
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
          <NavBar playerTurn={playerTurn} resetButton={resetButton} undoButton={undoButton} infoButton={infoButton} />
          {/* Grid containing the playing board */}
          <Grid
            container
            sx={{
              height: boardVisualDim,
              width: boardVisualDim,
              borderRadius: '5px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {(winner === DRAW) && (
              <ScreenDraw resetButton={resetButton} />
            )}
            {(winner >= 0 && winner < totalPlayers) && (
              <ScreenGameOver winner={winner} resetButton={resetButton} />
            )}
            {(showInfoScreen) && (
              <ScreenHowToPlay />
            )}
            {[...Array(dimension * dimension)].map((_, index) => (
              <Grid
                key={`cell-${index}`}
                item
                xs={ 12 / dimension }
                sx={{
                  border: '2px solid whitesmoke',
                  height: `calc(${boardVisualDim} / ${dimension} )`
                  // bgcolor: (index % 2) ? 'rgba(255,255,255,0.1)' : ''
                }}
              >
                <Cell id={`cell-id-${index}`} cellNo={index}>
                  {(gameboard[index]) && (
                    <CardPlayer
                      {...gameboard[index]}
                      disabled={true}
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
            <Box key={`player-${playerNo}-cards`} sx={{ height: `${(100 / totalPlayers) - 5}%` }}>
              <CardContainer isTurn={playerNo === playerTurn} playerNo={playerNo}>
                {/* Creating the totalSizes * totalCardsPerSize amount of cards */}
                {[...Array(totalSizes).keys()].map((size, index) => (
                  [...Array(totalCardsPerSize)].map((_, cardNo) => (
                    (!usedCards.includes(genCardID(cardNo, size, playerNo))) && (
                      <CardPlayer
                        id={genCardID(cardNo, size, playerNo)}
                        key={genCardID(cardNo, size, playerNo)}
                        size={size}
                        playerNo={playerNo}
                        cardNo={(index * totalCardsPerSize) + cardNo}
                        disabled={winner >= 0}
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
      toast.error('You can not place a card over your own.');
      playErrorSfx();
      return;
    }

    // Checking if the placed cell already has a card placed
    // that is bigger
    if (gameboard[targetCellNo]?.size >= droppedCardData?.size) {
      toast.error('Your card is not big enough to be placed over this one.');
      playErrorSfx();
      return;
    }

    // Update the board with the newly placed card
    const newGameboard = [...gameboard];
    newGameboard[targetCellNo] = {
      id: active?.id,
      size: droppedCardData?.size,
      playerNo: droppedCardData?.playerNo,
    }
    setPrevGameboard(gameboard);
    setGameboard(newGameboard);
    setPrevUsedCards([...usedCards]);
    setUsedCards([...usedCards, active.id]);
    playCardSfx();
  
    // Check game has been won
    const gameboardCopy = [...newGameboard];
    const gameboard2D = [];
    const [ placedX, placedY ] = [targetCellNo % dimension, Math.floor(targetCellNo / dimension)];
    while (gameboardCopy.length) gameboard2D.push(gameboardCopy.splice(0, dimension));

    const triggerWin = () => {
      setWinner(playerTurn);
      setLetUndo(false);
    }

    // Checking the row of the last placed card
    for (let x = 0; x < dimension; x++) {
      if (gameboard2D[placedY][x]?.playerNo !== playerTurn) break;
      if (x === dimension - 1)  {
        triggerWin();
        return;
      }
    }
    // Checking the column of the last placed card
    for (let y = 0; y < dimension; y++) {
      if (gameboard2D[y][placedX]?.playerNo !== playerTurn) break;
      if (y === dimension - 1) {
        triggerWin();
        return;
      }
    }
    // Checking diagonal top left to bottom right
    if (placedX === placedY) {
      for (let coord = 0; coord < dimension; coord++) {
        if (gameboard2D[coord][coord]?.playerNo !== playerTurn) break;
        if (coord === dimension - 1)  {
          triggerWin();
          return;
        }
      }
    }
    // Checking diagonal top right to bottom right
    if (placedX + placedY === dimension - 1) {
      for (let coord = 0; coord < dimension; coord++){
        if (gameboard2D[coord][(dimension - 1) - coord]?.playerNo !== playerTurn) break;
        if (coord === dimension - 1)  {
          triggerWin();
          return;
        }
      }
    }
    // Check for draw

    // Get all unused cards
    const unusedCards = allCards
      .filter(card => ![...usedCards, active.id].includes(card))
    let foundPossibleMove = false;

    unusedCards.forEach((card) => {
      if (foundPossibleMove) return;

      const cardData = JSON.parse(card);
      // Check for next player
      if (cardData.player === (playerTurn + 1) % totalPlayers) {
        newGameboard.forEach((cell) => {
          if (!cell || cell?.size < cardData.size) {
            foundPossibleMove = true;
          }
        })
      }
    })

    setPlayerTurn((playerTurn + 1) % totalPlayers);
    // Possible move not found, draw the game
    if (!foundPossibleMove) {
      setWinner(DRAW);
      setLetUndo(false);
      return;
    }
    setLetUndo(true);
  }
}

export default App;
