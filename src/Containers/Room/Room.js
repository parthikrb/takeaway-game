import React from "react";
import "./Room.css";
import Conversation from "../../Components/Conversation/Conversation";
import SelectionButtons from "../../Components/SelectionButtons/SelectionButtons";

const Room = () => {
  return (
    <div className="room">
      <div className="conversations">
        <Conversation recipient={true} />
        <Conversation recipient={false} />
        <Conversation recipient={true} />
        <Conversation recipient={false} />
        <Conversation recipient={true} />
      </div>
      <SelectionButtons />
    </div>
  );
};

export default Room;
