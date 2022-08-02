import { assets } from 'src/assets/assets';
import { DeviceWindow } from '../helpers/device-window';
import { Player } from '../player';

export default class MainScene extends Phaser.Scene {
    public deviceWindow: DeviceWindow;
    private background: Phaser.GameObjects.TileSprite;

    private player: Player;

    constructor() {
        super('main');
    }

    public preload() {
        this.deviceWindow = new DeviceWindow(this);

        this.player = new Player(this);

        this.load.image(assets.background.name, assets.background.path);
    }

    public create() {
        // Background
        this.background = this.add
            .tileSprite(0, 0, 0, 0, assets.background.name)
            .setOrigin(0, 0);

        this.background.displayWidth = this.deviceWindow.width;

        this.player.render();
    }

    public update() {
        this.background.tilePositionY -= 8;
    }
}
