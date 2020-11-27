import React from "react";
import "./Result.css";

const Result = (props) => {
  const { result, resetGame } = props;
  return (
    <div className="result">
      <p>You {result ? "won" : "lost"}</p>
      <button className="reset-game" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
};

export default Result;
