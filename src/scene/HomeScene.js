import Phaser from "phaser";

class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: "home-scene" });
    this.menuMusicPlaying = false;
  }

  preload() {
    this.load.image("background", "./src/assets/images/nebula.jpg");
    this.load.audio("menuMusic", "./src/assets/music/title.mp3");

  }

  create() {
    var background = this.add.image(0, 0, "background").setOrigin(0);

    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;

    this.add
      .text(this.game.config.width / 2, 200, "Space Shooter", {
        fontFamily: "Arial",
        fontSize: "64px",
      })
      .setOrigin(0.5);

    const startButton = this.add
      .text(this.game.config.width / 2, 400, "Démarrer le jeu", {
        fontFamily: "Arial",
        fontSize: "34px",
        backgroundColor: "#3498db",
        padding: {
          x: 20,
          y: 10,
        },
      })
      .setOrigin(0.5);

      this.menuMusic = this.sound.add("menuMusic", { loop: true, volume: 0.5 });
  //play the song only in this scene
  if (!this.menuMusicPlaying) {
    this.menuMusic.play();
    this.menuMusicPlaying = true;
  }

    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.menuMusic.stop();
      this.scene.start("space-scene");
    });

  }
}

export default HomeScene;
