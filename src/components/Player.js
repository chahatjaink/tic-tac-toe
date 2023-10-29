import { useState } from 'react';

export default function Player(props) {
    const [playerName, setPlayerName] = useState(props.name);
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(click => !click);
        if (clicked)
            props.onPlayerChange(props.symbol, playerName)
    }

    function handleChange(event) {
        console.log("TCL: handleChange -> event", event)
        setPlayerName(event.target.value);
    }

    let playerNameTag = <span className="player-name">{playerName}</span>
    let buttonTag = <button onClick={handleClick}>Edit</button>
    if (clicked) {
        playerNameTag = <input type="text" required defaultValue={playerName} onChange={handleChange} />
        buttonTag = <button onClick={handleClick}>Save</button>
    }

    return (
        <li className={props.isActive ? 'active' : null}>
            <span className="player">
                {playerNameTag}
                <span className="player-symbol">{props.symbol}</span>
            </span>
            {buttonTag}
        </li>

    )
}