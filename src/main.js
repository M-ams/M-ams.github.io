import Phaser from "phaser";
import HomeScene from "./scene/HomeScene";
import SpaceScene from "./scene/SpaceScene";
import GameOverScene from "./scene/GameOverScene";
import WinScene from "./scene/WinScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [HomeScene, SpaceScene, GameOverScene, WinScene],
};

export default new Phaser.Game(config);
