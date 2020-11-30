import express from "express";
import http from "http";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Initial State
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
  prevResult: null,
  started: false,
  conversations: [],
};

/**
 * function to add played to the initial state
 * @param {number} id
 */
const addPlayer = (id) => {
  for (let player of state.players) {
    if (player.id === null) {
      player.id = id;
      break;
    }
  }
};

/**
 * function to reset the state to initial values
 */
const resetState = () => {
  state.players.forEach((player) => {
    player.win = false;
  });
  state.prevResult = null;
  state.started = false;
  state.conversations = [];
};

/**
 * function to remove the player id from the state
 * @param {number} id
 */
const removePlayer = (id) => {
  const removedPlayer = state.players.find((player) => player.id === id);
  if (!!state.conversations.length) {
    removedPlayer.id = null;
    resetState();
    return;
  }
  removedPlayer.id = null;
};

/**
 * function to switch the player's turn
 */
const switchTurn = () => {
  for (let player of state.players) {
    player.turn = !player.turn;
  }
};

/**
 * function to indicate the game has been started
 * @param {object} data 
 */
const startGame = (data) => {
  state.prevResult = data.value;
  state.started = true;
  switchTurn();
  if (data.value === 1) {
    state.players.find((player) => player.id !== data.id).win = true;
    return;
  }
  const conversation = {
    id: data.id,
    playerName: state.players.find((player) => player.id === data.id).name,
    selection: data.value,
  };

  state.conversations.push(conversation);
};

/**
 * function to add move's by player
 * @param {object} move
 */
const makeMove = (move) => {
  const moveValue = parseInt(move.value);
  const currentResult = Math.ceil((state.prevResult + moveValue) / 3);
  const conversation = {
    id: move.id,
    playerName: state.players.find((player) => player.id === move.id).name,
    selection: move.value,
    computation: `[${state.prevResult}+(${moveValue})]/3=${currentResult}`,
    result: currentResult,
  };
  state.prevResult = currentResult;
  state.conversations.push(conversation);

  // To Check Win or Lose on each move
  if (currentResult === 1) {
    const playerWon = state.players.find((player) => player.id === move.id);
    playerWon.win = true;
  } else {
    switchTurn();
  }
};

io.on("connection", (socket) => {
  addPlayer(socket.id);
  io.emit("getState", state);

  io.of("/").clients((error, clients) => {
    if (clients.length > 2) socket.disconnect();
  });

  socket.on("startGame", (value) => {
    startGame(value);
    io.emit("getState", state);
  });

  socket.on("makeMove", (move) => {
    makeMove(move);
    io.emit("getState", state);
  });

  socket.on("disconnect", () => {
    removePlayer(socket.id);
    io.emit("getState", state);
  });

  socket.on("resetGame", () => {
    resetState();
    io.emit("getState", state);
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
