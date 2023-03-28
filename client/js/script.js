import { io } from "socket.io-client";
import render from "./render";
import sendInputToServer from "./input";

const WEBSOCKETS_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(WEBSOCKETS_URL);

socket.on("update", (game) => {
  render(game);
});

sendInputToServer(socket);
