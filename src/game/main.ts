import * as Phaser from 'phaser';
import HelloWorldScene from './scene';

export class Game {
    public game: Phaser.Game;

    private config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        // width: window.innerWidth * window.devicePixelRatio,
        // height: window.innerHeight * window.devicePixelRatio,
        scene: [HelloWorldScene],
        scale: {
            mode: Phaser.Scale.RESIZE,
            parent: 'game_phaser',
            width: 640,
            height: 960,
            // width: window.innerWidth * window.devicePixelRatio,
            // height: window.innerHeight * window.devicePixelRatio,
        },
    };

    constructor() {
        this.game = new Phaser.Game(this.config);
    }
}
