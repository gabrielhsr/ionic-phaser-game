import { assets } from 'src/assets/assets';
import { ResizeHelper } from './resize';

export default class HelloWorldScene extends Phaser.Scene {
    private scaleRatio = window.devicePixelRatio / 3;

    private gameWidth = window.innerWidth * window.devicePixelRatio;
    private gameHeight = window.innerHeight * window.devicePixelRatio;

    constructor() {
        super('hello-world');
    }

    public preload() {
        this.load.image(assets.player.name, assets.player.path);
    }

    public create() {
        new ResizeHelper(this.gameWidth, this.gameHeight, this);

        const player = this.add.image(
            this.gameWidth / 2,
            this.gameHeight,
            assets.player.name
        );

        player.setScale(this.scaleRatio, this.scaleRatio);
    }

    public update() {}
}
