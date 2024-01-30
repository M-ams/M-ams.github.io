import Phaser from "phaser";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "game-over-scene" });
  }

  preload() {
    this.load.image("background", "./src/assets/images/nebula.jpg");
    this.load.audio("GameOverMusic", "./src/assets/music/GameOver.mp3");

  }

  create() {
    var background = this.add.image(0, 0, "background").setOrigin(0);

    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;

    this.add
      .text(this.game.config.width / 2, 200, "Game Over", {
        fontFamily: "Arial",
        fontSize: "64px",
        color: "#ff0000",
      })
      .setOrigin(0.5);

    const restartButton = this.add
      .text(this.game.config.width / 2, 400, "Rejouer", {
        fontFamily: "Arial",
        fontSize: "34px",
        backgroundColor: "#3498db",
        padding: {
          x: 20,
          y: 10,
        },
      })
      .setOrigin(0.5);

    restartButton.setInteractive();
    restartButton.on("pointerdown", () => {
      window.location.reload();
    });
    this.GameOverMusic = this.sound.add("GameOverMusic", { loop: true, volume: 0.5 });
    this.GameOverMusic.play();
  }
}

export default GameOverScene;
