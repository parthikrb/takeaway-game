import "./App.css";
import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import Room from "./Containers/Room/Room";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io.connect("http://localhost:5000"));
  }, []);


  return (
    <div className="app">
      <div className="app__container">
        <Header />
        <Room socket={socket} />
      </div>
    </div>
  );
};

export default App;
