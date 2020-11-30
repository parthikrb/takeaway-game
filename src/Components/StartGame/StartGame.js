import React, { useState } from "react";
import "./StartGame.css";

const StartGame = (props) => {
  const { startGame } = props;
  const [number, setNumber] = useState("");

  const handleInputChange = (e) => {
    setNumber(Number(e.target.value));
  };

  const handleStartGame = () => {
    startGame(number);
  };
  return (
    <div className="start-game">
      <input
        type="number"
        value={number}
        min={1}
        onChange={handleInputChange}
        className="start-game__input"
      />
      <button className="start-game__button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartGame;
