import { io } from "socket.io-client";

const WEBSOCKETS_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(WEBSOCKETS_URL, {
  extraHeaders: { "RUBICON-DEBUG": "true" },
});

socket.on("update", (state) => {
  document.getElementById("debug").innerHTML = JSON.stringify(state, null, 2);
});
