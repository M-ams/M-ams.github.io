import Phaser from "phaser";

export default class Ship extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, "ship");

    this.setDepth(2);
    this.setScale(0.2);

    this.setDrag(300);
    this.setAngularDrag(400);
    this.setMaxVelocity(300);

    this.health = 100;
  }

  takeDamage(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.scene.gameOver();
    }
  }
}
