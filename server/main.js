/////////////
// IMPORTS //
/////////////

// Load .env
import * as dotenv from "dotenv";
dotenv.config();

// Server
import express from "express";
import { Server } from "socket.io";
import http from "http";

// Game functions
import createState from "./game/state.js";
import onConnect from "./game/connect.js";
import onDisconnect from "./game/disconnect.js";
import update from "./game/update.js";
import emit from "./game/emit.js";
import onInput from "./game/input.js";

// Constants from .env
const TICK_RATE = process.env.SERVER_TICK_RATE;
const PORT = process.env.SERVER_PORT;

//////////////////
// SERVER STUFF //
//////////////////

// Initialize server
const validOrigins = ["localhost", "127.0.0.1"];
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: validOrigins });

// Serve static files from dist directory (for production environment)
app.use(express.static("dist"));

// Start server
server.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});

////////////////
// GAME STUFF //
////////////////

// Initialize game state
const state = createState();

// Handle websocket connections
io.on("connection", (socket) => {
  let connection = onConnect(state);
  socket.on("disconnect", () => {
    onDisconnect(connection, state);
  });
  socket.on("input", (data) => {
    onInput(data, connection, state);
  });
});

// Main game loop
let prevTime = Date.now();

setInterval(() => {
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  update(dt, state);
  io.emit("update", emit(state));
  prevTime = currentTime;
}, 1000 / TICK_RATE);
