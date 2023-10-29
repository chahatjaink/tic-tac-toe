const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard(props) {
    let gameBoard = initialGameBoard;
    for (const turn of props.turns) {
        gameBoard[turn.square.row][turn.square.col] = turn.player;
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => props.onSelectPlayer(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                {playerSymbol}
                            </button>
                        </li>))}
                </ol>
            </li>))}
        </ol>
    )
}