import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleGameClick(rowIndex, colIndex) {
        setGameBoard(prevGameBoard => {
            const newGameBoard = [...prevGameBoard.map(rows => [...rows])];
            newGameBoard[rowIndex][colIndex] = "X";
            return newGameBoard;
        })
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => handleGameClick(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>))}
                </ol>
            </li>))}
        </ol>
    )
}