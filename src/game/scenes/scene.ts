import { DeviceWindow } from '../helpers/device-window';

import { Background } from '../objects/background';
import { Player } from '../objects/player';

export default class MainScene extends Phaser.Scene {
    public deviceWindow: DeviceWindow;

    private background: Background;
    private player: Player;

    constructor() {
        super('main');
    }

    public preload() {
        this.deviceWindow = new DeviceWindow(this);

        this.background = new Background(this);
        this.player = new Player(this);
    }

    public create() {
        this.background.render();
        this.player.render();

        this.player.controls();
    }

    public update() {
        this.background.animate();
    }
}
