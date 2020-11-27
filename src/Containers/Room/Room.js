import React, { useEffect, useState } from "react";
import "./Room.css";
import Conversation from "../../Components/Conversation/Conversation";
import SelectionButtons from "../../Components/SelectionButtons/SelectionButtons";
import Result from "../../Components/Result/Result";

const Room = React.memo((props) => {
  const { socket } = props;
  const [player, setPlayer] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [prevResult, setPrevResult] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("getState", (data) => {
        setPlayer(...data.players.filter((player) => player.id === socket.id));
        setConversations(data.conversations);
        setPrevResult(data.prevResult);
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  const checkMove = (buttonInput) => {
    const total = prevResult && prevResult + buttonInput;
    return total % 3 === 0;
  };

  const makeMove = (buttonInput) => {
    socket?.emit("makeMove", {
      id: socket.id,
      value: buttonInput,
    });
  };

  const resetGame = () => {
    socket?.emit("resetGame");
  };

  return (
    <div className="room">
      {prevResult === 1 ? (
        <Result result={player?.win} resetGame={resetGame} />
      ) : (
        <div
          className="conversations"
          style={{
            height: player?.turn ? `calc(100vh - 110px)` : `calc(100vh - 68px)`,
          }}
        >
          {conversations?.length === 0 ? (
            <div className="start-game">{`${
              player?.turn ? prevResult : "Wait for your turn"
            }`}</div>
          ) : (
            conversations &&
            conversations.map((conversation, index) => (
              <Conversation
                key={index}
                sender={socket?.id === conversation.id}
                conversation={conversation}
              />
            ))
          )}
        </div>
      )}
      {player?.turn && prevResult !== 1 && (
        <SelectionButtons checkMove={checkMove} makeMove={makeMove} />
      )}
    </div>
  );
});

export default Room;
