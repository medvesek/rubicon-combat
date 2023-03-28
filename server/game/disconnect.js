// This function runs every time
// a player disconnects from the server

export default function onDisconnect(player, state) {
  delete state.objects[player.id];
}
