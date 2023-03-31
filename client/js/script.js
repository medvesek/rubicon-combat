import { io } from "socket.io-client";
import render from "./render";
import sendInputToServer from "./input";
import { createShowDelayFunction } from "./utlities";

const WEBSOCKETS_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(WEBSOCKETS_URL);

let showDelay = createShowDelayFunction();

socket.on("update", (game) => {
  showDelay();
  render(game);
});

sendInputToServer(socket);
