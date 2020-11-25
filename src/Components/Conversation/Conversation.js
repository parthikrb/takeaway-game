import React from "react";
import "./Conversation.css";

const Conversation = (props) => {
  const { recipient } = props;

  const avatarClass = `conversation__avatar ${
    recipient ? "avatar--left" : "avatar--right"
  }`;

  const selectionClass = `conversation__selection ${
    recipient ? "selection--left" : "selection--right"
  }`;
  return (
    <div className="conversation">
      <div className="conversation__main-text">
        <div className={avatarClass}>
          <p>F</p>
        </div>
        <div className={selectionClass}>
          <p>1</p>
        </div>
      </div>
      <p className="conversation__computation">5+9</p>
      <p className="conversation__result">6</p>
    </div>
  );
};

export default Conversation;
