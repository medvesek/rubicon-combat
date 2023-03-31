import { io } from "socket.io-client";
import render from "./render";
import sendInputToServer from "./input";

const WEBSOCKETS_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(WEBSOCKETS_URL);

let delay = null;
let latestTime = null;
socket.on("update", (game) => {
  if (latestTime) {
    delay = Date.now() - latestTime;
  }
  latestTime = Date.now();
  render(game, delay);
});

sendInputToServer(socket);
