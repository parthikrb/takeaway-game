import express from "express";
import http from "http";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const getRandomNumber = () => Math.floor(Math.random() * 1000) + 2;

const state = {
  players: [
    {
      id: null,
      name: "P1",
      turn: true,
      win: false,
    },
    {
      id: null,
      name: "P2",
      turn: false,
      win: false,
    },
  ],
  prevResult: getRandomNumber(),
  conversations: [],
};

const addPlayer = (id) => {
  for (let player of state.players) {
    if (player.id === null) {
      player.id = id;
      break;
    }
  }
};

const resetState = () => {
  state.players.forEach((player) => {
    player.win = false;
  });
  state.prevResult = getRandomNumber();
  state.conversations = [];
};

const removePlayer = (id) => {
  const removedPlayer = state.players.find((player) => player.id === id);
  if (!!state.conversations.length) {
    removedPlayer.id = null;
    resetState();
    return;
  }
  removedPlayer.id = null;
};

const switchTurn = () => {
  for (let player of state.players) {
    player.turn = !player.turn;
  }
};

const makeMove = (move) => {
  let currentResult = Math.ceil((state.prevResult + move.value) / 3);
  let conversation = {
    id: move.id,
    playerName: state.players.find((player) => player.id === move.id).name,
    selection: move.value,
    computation: `[${state.prevResult}+(${move.value})]/3=${currentResult}`,
    result: currentResult,
  };
  state.prevResult = currentResult;
  state.conversations.push(conversation);

  // To Check Win or Lose on each move
  if (currentResult === 1) {
    const playerWon = state.players.find((player) => player.id === move.id);
    // const playerLost = state.players.find((player) => player.id !== move.id);
    playerWon.win = true;
    // playerWon.turn = true;
    // playerLost.win = false;
    // playerLost.turn = false;
  } else {
    switchTurn();
  }
};

io.on("connection", (socket) => {
  addPlayer(socket.id);
  console.log("a user connected", socket.id);
  console.log(state);
  io.emit("getState", state);

  io.of("/").clients((error, clients) => {
    if (clients.length > 2) socket.disconnect();
  });

  socket.on("makeMove", (move) => {
    console.log(move);
    makeMove(move);
    console.log(state);
    io.emit("getState", state);
  });

  socket.on("disconnect", () => {
    removePlayer(socket.id);
    io.emit("getState", state);
  });

  socket.on("resetGame", () => {
    // socket.disconnect();
    resetState();
    io.emit("getState", state);
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
