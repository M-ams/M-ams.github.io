import Phaser from "phaser";

class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setDepth(1);
  }
}

export default class ObstacleGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    // Number of obstacles you want to create
    const numObstacles = 22; // Adjust this number as per your desired density

    const asteroidTextures = [
      "asteroid1",
      "asteroid2",
      "asteroid3",
      "asteroid4",
    ];

    for (let i = 0; i < numObstacles; i++) {
      const x = Phaser.Math.Between(0, 8000); // Random X position within the world size
      const y = Phaser.Math.Between(0, 6000); // Random Y position within the world size
      const texture = Phaser.Math.RND.pick(asteroidTextures); // Randomly pick an asteroid texture

      const obstacle = new Obstacle(scene, x, y, texture);
      this.add(obstacle);
    }
  }
}
