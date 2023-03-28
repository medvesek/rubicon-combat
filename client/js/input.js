const gameArea = document.getElementById("game-area");
const keys = {};
const mouse = {
  leftMouseButton: false,
  x: 0,
  y: 0,
};

export default function sendInputToServer(socket) {
  registerInputListeners();
  window.requestAnimationFrame(() => inputLoop(socket));
}

function registerInputListeners() {
  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
  document.addEventListener("mousedown", (e) => {
    mouse.leftMouseButton = true;
  });
  document.addEventListener("mouseup", (e) => {
    mouse.leftMouseButton = false;
  });
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - gameArea.offsetLeft;
    mouse.y = e.clientY - gameArea.offsetTop;
  });
}

function inputLoop(socket) {
  socket.emit("input", { keys, mouse });
  window.requestAnimationFrame(() => inputLoop(socket));
}
