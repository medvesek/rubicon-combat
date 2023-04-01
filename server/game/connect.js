import randomColor from "../lib/random/randomColor.js";
import randomInt from "../lib/random/randomInt.js";

// This function runs every time
// a new player connects to the server

export default function onConnect(state) {
  let player = createNewPlayer(state);

  state.objects[player.id] = player;

  return player;
}

function createNewPlayer(state) {
  return {
    id: state.newObjectId++,
    type: "player",
    color: randomColor(),
    size: {
      width: 10,
      height: 10,
    },
    position: {
      x: randomInt(0, 200),
      y: randomInt(0, 200),
    },
    velocity: {
      x: 0,
      y: 0,
    },
    drag: state.settings.drag,
    cooldown: 0,
    keys: {},
    mouse: {},
    idleTimeoutTimer: state.settings.idleTimeout,
  };
}
