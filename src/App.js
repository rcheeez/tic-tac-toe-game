import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const initialGameBoard = [
  [null, null, null], 
  [null, null, null],
  [null, null, null]
];
function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0';
  }

  return currentPlayer; 
}
function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    '0': 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);

  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(arr => [...arr])];

    for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
    }

    let winner;
  for( const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]; 
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

  const handleRematch = () => {
    setGameTurns([]);
  }

  const handleSelectSquare = (rowIndex, colIndex) => {
    //setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? '0': 'X');
    setGameTurns(prevTurns => {

      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurn = [
        {square : {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ]

      return updatedTurn;
    });
  }

  const handlePlayerNameChange = (symbol, playerName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: playerName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
            <Player name="Player 1" symbol="X" onChangeName={handlePlayerNameChange} isActive={activePlayer === 'X'} />
            <Player name="Player 2" symbol="0" onChangeName={handlePlayerNameChange} isActive={activePlayer === '0'} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
