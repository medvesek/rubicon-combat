// This functions sends game state to the client 60 times per second

export default function emit(state) {
  return {
    objects: Object.values(state.objects).map((player) => ({
      id: player.id,
      position: player.position,
      color: player.color,
      height: player.size.height,
      width: player.size.width,
      velocity: player.velocity,
      keys: player.keys,
    })),
    settings: {
      height: state.settings.maxY + 10,
      width: state.settings.maxX + 10,
    },
  };
}
