import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WINNIG_COMBINATIONS";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function setActivePlayer(gameTurns) {
  let player = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === 'X')
    player = "O";
  return player
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = setActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }

  let winner;
  for (const wins of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[wins[0].row][wins[0].column]
    const secondSymbol = gameBoard[wins[1].row][wins[1].column]
    const thirdSymbol = gameBoard[wins[2].row][wins[2].column]

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol)
      winner = players[firstSymbol]
  }

  function handleSelectPlayer(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      let player = setActivePlayer(prevGameTurns)
      const turns = [
        { square: { row: rowIndex, col: colIndex }, player },
        ...prevGameTurns
      ]
      return turns;
    })

  }

  let hasDrawn = gameTurns.length === 9 && !winner
  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {(winner || hasDrawn) && (<GameOver winner={winner} onRematch={handleRematch} />)}
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onPlayerChange={handlePlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} onPlayerChange={handlePlayerNameChange} />
        </ol>
        <GameBoard onSelectPlayer={handleSelectPlayer} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main >
  );
}

export default App;
