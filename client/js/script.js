import { io } from "socket.io-client";
import render from "./render";
import sendInputToServer from "./input";
import { registerInputListeners, keys, mouse } from "./input";
import { createShowDelayFunction } from "./utlities";
import update from "./update";

const WEBSOCKETS_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(WEBSOCKETS_URL);
let serverState = null;
let currentState = null;

const showDelayFunction = createShowDelayFunction();

socket.on("update", (game) => {
  showDelayFunction();
  serverState = game;
});

registerInputListeners();

let prevTime = Date.now();

function gameLoop(socket) {
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  if (serverState) {
    currentState = serverState;
    render(serverState);
    serverState = null;
  } else if (currentState) {
    update(dt, currentState);
    render(currentState);
  }

  socket.emit("input", { keys, mouse });

  window.requestAnimationFrame(() => gameLoop(socket));
  prevTime = currentTime;
}

gameLoop(socket);
