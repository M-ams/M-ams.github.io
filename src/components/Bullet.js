import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, "space", "bullet");

    this.setBlendMode(1);
    this.setDepth(1);

    this.speed = 800;
    this.lifespan = 100;

    this._temp = new Phaser.Math.Vector2();
  }

  fire(ship) {
    this.lifespan = 1000;

    this.setActive(true);
    this.setVisible(true);
    this.setAngle(ship.body.rotation);
    this.setPosition(ship.x, ship.y);
    this.body.reset(ship.x, ship.y);

    const angle = Phaser.Math.DegToRad(ship.body.rotation);

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      this.body.velocity
    );

    this.body.velocity.x *= 2;
    this.body.velocity.y *= 2;

    const laserSound = this.scene.sound.add("laserSound");
    laserSound.play();
  }

  update(time, delta) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
      this.body.stop();
    }
  }

  
}
