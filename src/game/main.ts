import * as Phaser from 'phaser';

export class Game {
    public game: Phaser.Game;

    private config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game_phaser',
        scene: {
            preload: this.preload,
            create: this.create,
        },
    };

    constructor() {
        this.game = new Phaser.Game(this.config);

        screen.orientation.lock('portrait');
    }

    private preload() {
        console.log('preload');
    }

    private create() {
        console.log('create');
    }
}
