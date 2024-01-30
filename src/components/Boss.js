import Phaser from "phaser";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setDepth(1);

    this.health = 200; // Donnez au boss plus de santé, par exemple
    this.speed = 50;   // Réglez la vitesse du boss comme vous le souhaitez
  }

  takeDamage(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.destroy();
    }
  }
}


