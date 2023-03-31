const gameArea = document.getElementById("game-area");
const elements = {};

export default function render(game, delay) {
  showDelay(delay);

  updateGameArea(game);

  for (let object of game.objects) {
    updateOrCreateElement(object);
  }
  removeDeletedElements(game);
}

function showDelay(delay) {
  document.getElementById("delay").innerHTML = delay + " ms";
}

function updateGameArea(game) {
  gameArea.style.width = game.settings.width + "px";
  gameArea.style.height = game.settings.height + "px";
}

function updateOrCreateElement(object) {
  let element = elements[object.id];

  if (!element) {
    element = createElement(object);
  }
  updateElement(element, object);
}

function createElement(object) {
  let element = document.createElement("div");
  element.id = "player" + object.id;
  element.style.width = object.width + "px";
  element.style.height = object.height + "px";
  element.style.background = object.color;
  element.style.position = "absolute";
  element.style.top = "0";
  element.style.left = "0";
  gameArea.appendChild(element);
  elements[object.id] = element;
  return element;
}

function updateElement(element, object) {
  element.style.left = object.position.x + "px";
  element.style.top = object.position.y + "px";
}
function removeDeletedElements(game) {
  for (let id in elements) {
    if (!game.objects.find((object) => object.id == id)) {
      removeElement(id);
    }
  }
}

function removeElement(id) {
  elements[id].classList.add("play-destroy-animation");
  setTimeout(() => {
    if (elements[id]) {
      elements[id].remove();
      delete elements[id];
    }
  }, 1000);
}
