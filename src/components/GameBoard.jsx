import React from 'react'
export default function GameBoard({ onSelectSquare, board }) {
    // const [gameBoard, setGameBoard] = React.useState(initialGameBoard);
    // const handleSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         console.log(`${rowIndex} ${colIndex}`);
    //         return updateBoard;
    //     });

    // let gameBoard = initialGameBoard;

    // for(const turn of turns) {
    //   const {square, player} = turn;
    //   const {row, col} = square;

    //   gameBoard[row][col] = player;
    // }
  return (
    <ol id='game-board'>
      { board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex)=> <li key={colIndex}><button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>)}
            </ol>
      </li>)}
    </ol>
  )
}
