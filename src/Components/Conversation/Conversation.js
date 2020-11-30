import React from "react";
import "./Conversation.css";

/**
 * Component which displays values selection, computation and the result
 * as a conversation
 * @param {Object} sender_and_conversation
 */
const Conversation = (props) => {
  const { sender, conversation } = props;

  const avatarClass = `conversation__avatar ${
    !sender ? "avatar--left" : "avatar--right"
  }`;

  const selectionClass = `conversation__selection ${
    !sender ? "selection--left" : "selection--right"
  }`;

  const conversationLinesClass = `conversation__lines ${
    !sender ? "line--left" : "line--right"
  }`;
  return (
    <div className="conversation">
      <div className="conversation__main-text">
        <div className={avatarClass}>
          <p>{conversation.playerName}</p>
        </div>
        <div className={selectionClass}>
          <p>{conversation.selection}</p>
        </div>
      </div>
      {conversation.computation && (
        <p className={conversationLinesClass}>{conversation.computation}</p>
      )}
      {conversation.result && (
        <p className={conversationLinesClass}>{conversation.result}</p>
      )}
    </div>
  );
};

export default Conversation;
