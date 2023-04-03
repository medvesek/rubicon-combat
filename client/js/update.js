import randomColor from "../../server/lib/random/randomColor.js";
import {
  handleMovementInput,
  changePosition,
  applyDrag,
} from "../../server/game/update.js";

export default function update(dt, state) {
  for (let object of Object.values(state.objects)) {
    handleMovementInput(object, dt, state);
    changePosition(object, dt, state);
    applyDrag(object, dt, state);
  }
}
