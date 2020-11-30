import React from "react";
import "./Result.css";
import win from "../../assets/svg/win.svg";
import lose from "../../assets/svg/lose.svg";

/**
 * Component to display the result of the game
 * @param {Object} props 
 * take result as an input and 
 * emit resetGame action to the parent component
 */
const Result = (props) => {
  const { result, resetGame } = props;
  return (
    <div className="result">
      <div className="result__content">
        <img
          className="result__image"
          src={result ? win : lose}
          alt={result ? "won" : "lost"}
        />
        <p>You {result ? "won" : "lost"}</p>
      </div>
      <button className="reset-game" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
};

export default Result;
