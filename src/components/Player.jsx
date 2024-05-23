import React, { useState } from 'react'

export default function Player({ name, symbol, isActive, onChangeName }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);


    const changeEdit = () => {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName); 
        }
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value);
    }

  return (
    <li className={isActive ? 'active': undefined}>
        <span className="player">
            {isEditing ? <input type='text' onChange={handleChange} value={playerName} required/>: <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={changeEdit}>{isEditing ? "Save": "Edit"}</button>


    </li>
  )
}
