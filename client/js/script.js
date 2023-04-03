import { io } from "socket.io-client";
import render from "./render";
import { registerInputListeners, keys, mouse } from "./input";
import { createShowDelayFunction } from "./utlities";
import update from "./update";

const WEBSOCKETS_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(WEBSOCKETS_URL);
let serverState = null;
let currentState = null;

const showDelay = createShowDelayFunction();

socket.on("update", (state) => {
  showDelay();
  serverState = state;
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

  prevTime = currentTime;
  window.requestAnimationFrame(() => gameLoop(socket));
}

gameLoop(socket);
