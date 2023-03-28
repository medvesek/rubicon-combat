// This function creates the initial game state and
// runs once when the server is started

export default function createState() {
  return {
    newObjectId: 1,
    objects: {},
    settings: {
      minX: 0,
      minY: 0,
      maxX: 1000,
      maxY: 500,
      drag: 0.3,
      maxVelocity: 2.5,
      acceleration: 0.5,
      cooldown: 30,
      idleTimeout: 60,
    },
  };
}
