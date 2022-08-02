import * as Phaser from 'phaser';
import MainScene from './scenes/scene';

export class Game {
    public game: Phaser.Game;

    private config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        scene: [MainScene],
        scale: {
            mode: Phaser.Scale.RESIZE,
            parent: 'game_phaser',
            width: 640,
            height: 960,
        },
    };

    constructor() {
        this.game = new Phaser.Game(this.config);
    }
}
