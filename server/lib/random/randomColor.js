import randomInt from "./randomInt.js";

export default function randomColor() {
  let rgb = {
    r: randomInt(0, 255),
    g: randomInt(0, 255),
    b: randomInt(0, 255),
  };

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
