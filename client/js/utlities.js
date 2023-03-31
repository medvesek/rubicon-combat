function createShowDelayFunction() {
  let lastTime = null;
  let currentDelay = null;
  let maxDelay = null;
  let delayUpdateCountdown = 0;
  let delayUpdateDelay = 1;
  let displayElement = document.getElementById("delay");

  setInterval(() => {
    if (delayUpdateCountdown > 0) {
      delayUpdateCountdown--;
    }
  }, 1000);

  return function () {
    if (lastTime) {
      currentDelay = Date.now() - lastTime;
    }
    if (currentDelay > maxDelay || !maxDelay) {
      maxDelay = currentDelay;
    }
    if (delayUpdateCountdown <= 0) {
      displayElement.innerHTML = maxDelay + " ms";
      delayUpdateCountdown = delayUpdateDelay;
      maxDelay = null;
    }
    lastTime = Date.now();
  };
}

export { createShowDelayFunction };
