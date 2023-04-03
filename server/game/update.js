import randomColor from "../lib/random/randomColor.js";

// This functions updates the game state
// and runs 60 times per second

export default function update(dt, state) {
  for (let object of Object.values(state.objects)) {
    updateObject(object, dt, state);

    handleCollisions(object, dt, state);

    handleIdleTimeout(object, dt, state);

    handleInput(object, dt, state);
  }
}

function updateObject(player, dt, state) {
  changePosition(player, dt, state);
  applyDrag(player, dt, state);
  updateCooldown(player, dt, state);
}

function handleInput(player, dt, state) {
  handleMovementInput(player, dt, state);
  handleFireInput(player, dt, state);
}

function updateCooldown(player, dt, state) {
  if (player.cooldown > 0) {
    player.cooldown -= dt / 16;
  }
}

function handleIdleTimeout(object, dt, state) {
  if (object.idleTimeoutTimer !== undefined) {
    if (
      Object.values(object.keys).some((v) => v) ||
      object.mouse.leftMouseButton
    ) {
      object.idleTimeoutTimer = state.settings.idleTimeout;
    }
    object.idleTimeoutTimer -= dt / 1000;
    if (object.idleTimeoutTimer <= 0) {
      delete state.objects[object.id];
    }
  }
}

export function handleMovementInput(player, dt, state) {
  let maxVelocity = state.settings.maxVelocity;
  let acceleration = state.settings.acceleration * (dt / 16);

  if (player.keys["ArrowRight"] || player.keys["d"]) {
    if (player.velocity.x < maxVelocity) {
      player.velocity.x += acceleration;
    }
  }
  if (player.keys["ArrowLeft"] || player.keys["a"]) {
    if (player.velocity.x > -maxVelocity) {
      player.velocity.x -= acceleration;
    }
  }
  if (player.keys["ArrowUp"] || player.keys["w"]) {
    if (player.velocity.y > -maxVelocity) {
      player.velocity.y -= acceleration;
    }
  }
  if (player.keys["ArrowDown"] || player.keys["s"]) {
    if (player.velocity.y < maxVelocity) {
      player.velocity.y += acceleration;
    }
  }
}

function handleFireInput(player, dt, state) {
  if (player.mouse.leftMouseButton && player.cooldown <= 0) {
    let id = state.newObjectId++;

    let size = 5;
    let speed = 10;
    let drag = 0.04;
    let buffer = 5;

    let target = {
      x: player.mouse.x,
      y: player.mouse.y,
    };

    let centerX = player.position.x + player.size.width / 2;
    let centerY = player.position.y + player.size.height / 2;

    let distance = Math.sqrt(
      Math.pow(target.x - centerX, 2) + Math.pow(target.y - centerY, 2)
    );

    let direction = Math.atan2(target.y - centerY, target.x - centerX);

    let positionX =
      centerX - size / 2 + (player.size.width + buffer) * Math.cos(direction);
    let positionY =
      centerY - size / 2 + (player.size.height + buffer) * Math.sin(direction);

    let velocityX = (speed * (target.x - player.position.x)) / distance;
    let velocityY = (speed * (target.y - player.position.y)) / distance;

    state.objects[id] = {
      id: id,
      type: "projectile",
      color: randomColor(),
      size: {
        width: size,
        height: size,
      },
      position: {
        x: positionX,
        y: positionY,
      },
      velocity: {
        x: velocityX,
        y: velocityY,
      },
      drag: drag,
      keys: {},
      mouse: {},
    };
    player.cooldown = state.settings.cooldown;
  }
}

function handleCollisions(player, dt, state) {
  let collidingObject = collision(player, state);
  if (collidingObject) {
    delete state.objects[player.id];
    delete state.objects[collidingObject.id];
  }
}

function collision(player, state) {
  for (let otherPlayer of Object.values(state.objects)) {
    if (otherPlayer.id === player.id) {
      continue;
    }

    if (
      player.position.x >= otherPlayer.position.x &&
      player.position.x <= otherPlayer.position.x + otherPlayer.size.width &&
      player.position.y >= otherPlayer.position.y &&
      player.position.y <= otherPlayer.position.y + otherPlayer.size.height
    ) {
      return otherPlayer;
    }
  }
}

export function applyDrag(player, dt, state) {
  let drag = player.drag * (dt / 16);
  let speed = Math.sqrt(
    Math.pow(player.velocity.x, 2) + Math.pow(player.velocity.y, 2)
  );
  if (speed) {
    let decreasedSpeed = Math.max(0, speed - drag);
    let decreaseFactor = decreasedSpeed / speed;
    player.velocity.x *= decreaseFactor;
    player.velocity.y *= decreaseFactor;
  }
}

export function changePosition(object, dt, state) {
  let minX = state.settings.minX;
  let minY = state.settings.minY;
  let maxX = state.settings.maxX;
  let maxY = state.settings.maxY;

  object.position.x += object.velocity.x * (dt / 16);
  object.position.y += object.velocity.y * (dt / 16);

  if (object.position.x > maxX) {
    object.position.x = maxX;
    object.velocity.x = 0;
    if (object.type === "projectile") {
      delete state.objects[object.id];
    }
  }
  if (object.position.y > maxY) {
    object.position.y = maxY;
    object.velocity.y = 0;
    if (object.type === "projectile") {
      delete state.objects[object.id];
    }
  }
  if (object.position.y < minY) {
    object.position.y = minY;
    object.velocity.y = 0;
    if (object.type === "projectile") {
      delete state.objects[object.id];
    }
  }
  if (object.position.x < minX) {
    object.position.x = minX;
    object.velocity.x = 0;
    if (object.type === "projectile") {
      delete state.objects[object.id];
    }
  }
}
