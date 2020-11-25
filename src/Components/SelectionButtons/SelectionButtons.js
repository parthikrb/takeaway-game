import React from "react";
import "./SelectionButtons.css";

const SelectionButtons = () => {
  const buttonClass = `action__button disabled`;
  return (
    <div className="action">
      <div className="action__buttons">
        <button className={buttonClass}>-1</button>
        <button className="action__button">0</button>
        <button className="action__button">+1</button>
      </div>
    </div>
  );
};

export default SelectionButtons;
