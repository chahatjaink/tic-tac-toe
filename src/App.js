import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";

function setActivePlayer(gameTurns) {
  let player = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === 'X')
    player = "O";
  return player
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = setActivePlayer(gameTurns)

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectPlayer={handleSelectPlayer} turns={gameTurns} />
      </div>
      <Log gameTurns={gameTurns} />
    </main >
  );
}

export default App;
