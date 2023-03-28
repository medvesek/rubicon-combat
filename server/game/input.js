// This function runs when the server recieves
// input data (which buttons were pressed) from the client

export default function onInput(input, player, state) {
  player.keys = input.keys;
  player.mouse = input.mouse;
}
