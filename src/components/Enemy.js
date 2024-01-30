import Phaser from "phaser";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setDepth(1);

    this.health = 40;
    this.speed = 200;
  }

  takeDamage(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.destroy();
    }
  }
}

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, numEnemies) {
    super(scene.physics.world, scene);

    numEnemies = numEnemies || 4;

    const enemyTextures = ["mob1", "mob2", "mob3", "mob5"];

    for (let i = 0; i < numEnemies; i++) {
      const x = Phaser.Math.Between(0, 8000);
      const y = Phaser.Math.Between(0, 6000);
      const texture = Phaser.Math.RND.pick(enemyTextures);

      const enemy = new Enemy(scene, x, y, texture);
      this.add(enemy);
    }
  }
}
