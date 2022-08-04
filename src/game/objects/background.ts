import { Asset } from 'src/assets/assets';
import MainScene from '../scenes/scene';

export class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene: MainScene, asset: Asset) {
        super(scene, 0, 0, 0, 0, asset.key);

        // Set Origind and Size to fit the screen
        this.setOrigin(0, 0);
        this.displayWidth = scene.deviceWindow.width;

        scene.add.existing(this);
    }

    protected preUpdate(): void {
        this.tilePositionY -= 8;
    }
}
