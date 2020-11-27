import React from "react";
import "./SelectionButtons.css";

const SelectionButtons = (props) => {
  const { checkMove, makeMove } = props;
  const buttonOptions = ["-1", "0", "+1"];

  return (
    <div className="action">
      <div className="action__buttons">
        {buttonOptions.map((option, index) => (
          <button
            key={index}
            className={`action__button ${
              checkMove(parseInt(option)) ? "enabled" : "disabled"
            }`}
            onClick={() => makeMove(parseInt(option))}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectionButtons;
