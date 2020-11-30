import React from "react";
import "./SelectionButtons.css";

/**
 * Component to display the action button during game
 * @param {Object} props
 * checkMove - checks if button's value meets condition
 * makeMove - sends the selected button values to parent component
 */
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
            onClick={() => makeMove(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectionButtons;
