import Phaser from "phaser";
import Obstacle from "../components/Obstacle.js";
import Enemy from "../components/Enemy.js";
import Bullet from "../components/Bullet.js";
import Boss from "../components/Boss.js";

export default class SpaceScene extends Phaser.Scene {
  lastFired = 0;

  bossSpawnedForLevel3 = false;
  bossSpawnedForLevel5 = false;

  preload() {
    this.load.image("background", "./src/assets/images/nebula.jpg");
    this.load.image("stars", "./src/assets/images/nebula.jpg");
    this.load.image("ship", "./src/assets/images/spaceship1.png");
    this.load.atlas(
      "space",
      "./src/assets/images/space/space.png",
      "./src/assets/images/space/space.json"
    );

    this.load.image("asteroid1", "./src/assets/images/space/asteroid1.png");
    this.load.image("asteroid2", "./src/assets/images/space/asteroid2.png");
    this.load.image("asteroid3", "./src/assets/images/space/asteroid3.png");
    this.load.image("asteroid4", "./src/assets/images/space/asteroid4.png");

    this.load.image("mob1", "./src/assets/images/space/mob1.png");
    this.load.image("mob2", "./src/assets/images/space/mob2.png");
    this.load.image("mob3", "./src/assets/images/space/mob3.png");
    this.load.image("mob5", "./src/assets/images/space/mob5.png");

    this.load.image("boss", "./src/assets/images/space/mob4.png");

    this.load.audio("SpaceMusic", "./src/assets/music/Uranus.mp3");

    this.load.audio("laserSound", "./src/assets/music/preview.mp3");

    this.load.audio("collisionSound", "./src/assets/music/hit.mp3");

    this.load.audio("bossSound", "./src/assets/music/Boss.mp3");
    
  }

  constructor() {
    super("space-scene");
    this.currentLevel = 1;
  }

  create() {
    this.physics.world.setBounds(0, 0, 8000, 6000, true, true, true, true);

    this.bg = this.add
      .tileSprite(400, 300, 800, 600, "background")
      .setScrollFactor(0);

    this.stars = this.add
      .tileSprite(
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight,
        "stars"
      )
      .setScrollFactor(0);

    const emitter = this.add.particles(0, 0, "space", {
      frame: "ship",
      speed: 100,
      lifespan: {
        onEmit: (particle, key, t, value) => {
          return Phaser.Math.Percent(this.ship.body.speed, 0, 300) * 2000;
        },
      },
      alpha: {
        onEmit: (particle, key, t, value) => {
          return Phaser.Math.Percent(this.ship.body.speed, 0, 300);
        },
      },
      angle: {
        onEmit: (particle, key, t, value) => {
          return this.ship.angle - 180 + Phaser.Math.Between(-10, 10);
        },
      },
      scale: { start: 0.6, end: 0 },
      blendMode: "ADD",
    });

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });

    this.ship = this.physics.add.image(4000, 3000, "ship").setDepth(2);
    this.ship.setScale(0.2);

    this.ship.setDrag(300);
    this.ship.setAngularDrag(400);
    this.ship.setMaxVelocity(300);

    emitter.startFollow(this.ship);

    this.cameras.main.startFollow(this.ship);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.obstacles = new Obstacle(this);
    this.physics.add.collider(
      this.ship,
      this.obstacles,
      this.handleCollision,
      null,
      this
    );

    //create boucle tout les 10 secondes une nouvelle vague d'asteroides
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        this.obstacles = new Obstacle(this);
        this.physics.add.collider(
          this.ship,
          this.obstacles,
          this.handleCollision,
          null,
          this
        );
      },
      loop: true,
    });

    this.enemies = new Enemy(this);
    this.physics.add.collider(
      this.ship,
      this.enemies,
      this.handleCollision,
      null,
      this
    );

    this.physics.add.collider(
      this.bullets,
      this.enemies,
      this.handleBulletCollision,
      null,
      this
    );

    this.healthText = this.add.text(
      this.cameras.main.width - 10,
      30,
      "Santé: 100%",
      {
        font: "16px Arial",
        fill: "#ffffff",
      }
    );
    this.ship.health = 100;
    this.healthText.setOrigin(1, 0);
    this.healthText.setScrollFactor(0, 0);

    this.remainingEnemiesText = this.add.text(
      this.cameras.main.width - 10,
      50,
      "Ennemis restants: 0",
      {
        font: "16px Arial",
        fill: "#ffffff",
      }
    );
    this.remainingEnemiesText.setOrigin(1, 0);
    this.remainingEnemiesText.setScrollFactor(0, 0);

    this.levelText = this.add.text(
      this.cameras.main.width - 10,
      100,
      "Niveau:",
      {
        font: "16px Arial",
        fill: "#ffffff",
      }
    );

    this.levelText.setOrigin(1, 0);
    this.levelText.setScrollFactor(0, 0);

    this.SpaceMusic = this.sound.add("SpaceMusic", { loop: true, volume: 0.5 });
  //play the song only in this scene
  this.SpaceMusic.play();
  //stop the menuMusic and play the gameMusic

  this.bossSound = this.sound.add("bossSound", { loop: true, volume: 0.5 });


  }

  update(time, delta) {
    const { left, right, up } = this.cursors;

    if (left.isDown) {
      this.ship.setAngularVelocity(-150);
    } else if (right.isDown) {
      this.ship.setAngularVelocity(150);
    } else {
      this.ship.setAngularVelocity(0);
    }

    if (up.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation,
        600,
        this.ship.body.acceleration
      );
    } else {
      this.ship.setAcceleration(0);
    }

    if (this.fire.isDown && time > this.lastFired) {
      const bullet = this.bullets.get();

      if (bullet) {
        bullet.fire(this.ship);

        this.lastFired = time + 100;
      }
    }

    this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
    this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;

    this.stars.tilePositionX += this.ship.body.deltaX() * 2;
    this.stars.tilePositionY += this.ship.body.deltaY() * 2;

    this.enemies.children.iterate((enemy) => {
      if (enemy.active) {
        const angle = Phaser.Math.Angle.Between(
          enemy.x,
          enemy.y,
          this.ship.x,
          this.ship.y
        );
        const velocity = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle)
        )
          .normalize()
          .scale(enemy.speed);
        enemy.setVelocity(velocity.x, velocity.y);
      }
    });

    if (this.boss && this.boss.active) {
      const angle = Phaser.Math.Angle.Between(
        this.boss.x,
        this.boss.y,
        this.ship.x,
        this.ship.y
      );
      const velocity = new Phaser.Math.Vector2(Math.cos(angle), Math.sin(angle))
        .normalize()
        .scale(this.boss.speed);

      // Réglez la vitesse du boss en fonction de la direction du vaisseau
      this.boss.setVelocity(velocity.x, velocity.y);
    }

    this.levelText.setText("Niveau: " + this.currentLevel);
    this.healthText.setText("Point de vie: " + this.ship.health);
    this.remainingEnemiesText.setText(
      "Ennemis restants: " + this.enemies.countActive()
    );

    if (this.boss && !this.boss.active && this.currentLevel !== 4) {
      this.currentLevel++;
      this.nextLevel();
    }
  }

  handleCollision(ship, obstacle) {
    this.takeDamage(ship, 1);
  }

  handleBulletCollision(bullet, enemy) {
    if (bullet.active && enemy.active) {
      enemy.takeDamage(12);
      bullet.setActive(false).setVisible(false);

      if (this.enemies.countActive() === 0) {
        this.currentLevel++;
        this.nextLevel();
      }
    }
  }
  handleBulletCollisionBoss(bullet, boss) {
    if (bullet.active && boss) {
      this.boss.takeDamage(15);
      boss.setActive(false).setVisible(false);
  }
}

  gameOver() {
    this.SpaceMusic.stop();
    this.scene.start("game-over-scene");
  }

  takeDamage(ship, damage) {
    ship.health -= damage;

    if (ship.health <= 0) {
      this.gameOver();
    }
  }

  nextLevel() {
    if (this.currentLevel === 3 && !this.bossSpawnedForLevel3) {
      this.spawnBoss();
      this.bossSpawnedForLevel3 = true;
    } else if (this.currentLevel === 4) {
      this.bossSound.stop();
      this.SpaceMusic.play();
      const numEnemiesForNextLevel = 20;
      this.enemies = new Enemy(this, numEnemiesForNextLevel);
      this.physics.add.collider(
        this.ship,
        this.enemies,
        this.handleCollision,
        null,
        this
      );

      this.physics.add.collider(
        this.bullets,
        this.enemies,
        this.handleBulletCollision,
        null,
        this
      );
    } else if (this.currentLevel === 5 && !this.bossSpawnedForLevel5) {
      this.spawnBoss();
      this.bossSpawnedForLevel5 = true;
    } else if (this.currentLevel >= 6) {
      this.bossSound.stop();
      this.SpaceMusic.stop();
      this.scene.start("win-scene");
    } else {
      const numEnemiesForNextLevel = 12;

      this.enemies = new Enemy(this, numEnemiesForNextLevel);
      this.physics.add.collider(
        this.ship,
        this.enemies,
        this.handleCollision,
        null,
        this
      );

      this.physics.add.collider(
        this.bullets,
        this.enemies,
        this.handleBulletCollision,
        null,
        this
      );
    }
  }

  spawnBoss() {

    //play sounds
    this.bossSound.play();
    this.SpaceMusic.stop();

    const bossX = this.ship.x + 200;
    const bossY = this.ship.y + 200;

    this.boss = new Boss(this, bossX, bossY, "boss");
    this.boss.setDepth(2);

    this.add.existing(this.boss);
    this.physics.add.existing(this.boss);

    this.physics.add.collider(
      this.ship,
      this.boss,
      this.handleCollision,
      null,
      this
    );

    this.physics.add.collider(
      this.bullets,
      this.boss,
      this.handleBulletCollisionBoss,
      null,
      this
    );
    if (this.currentLevel === 3) {
      this.boss.speed = 100;
      this.boss.health = 500;
    } else if (this.currentLevel === 5) {
      this.boss.speed = 150;
      this.boss.health = 1000;
      
    }
  }
}
