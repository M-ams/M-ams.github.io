import Phaser from "phaser";

class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "win-scene" });
  }

  preload() {
    this.load.image("background", "./src/assets/images/nebula.jpg");
    this.load.audio("WinMusic", "./src/assets/music/Win.mp3");

  }

  create() {
    var background = this.add.image(0, 0, "background").setOrigin(0);

    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;

    this.add
      .text(this.game.config.width / 2, 200, "Victoire !", {
        fontFamily: "Arial",
        fontSize: "64px",
        color: "#00ff00", // Couleur verte pour la victoire
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


    this.WinMusic = this.sound.add("WinMusic", { loop: true, volume: 0.5 });
    this.WinMusic.play();
      

    restartButton.setInteractive();
    restartButton.on("pointerdown", () => {
      
      window.location.reload();

    });
  }
}

export default WinScene;
