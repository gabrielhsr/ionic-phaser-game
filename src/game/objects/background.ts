import { assets } from 'src/assets/assets';
import MainScene from '../scenes/scene';

export class Background {
    private background: Phaser.GameObjects.TileSprite;

    constructor(private scene: MainScene) {
        this.scene.load.image(assets.background.name, assets.background.path);
    }

    public render() {
        this.background = this.scene.add
            .tileSprite(0, 0, 0, 0, assets.background.name)
            .setOrigin(0, 0);

        this.background.displayWidth = this.scene.deviceWindow.width;
    }

    public animate() {
        this.background.tilePositionY -= 8;
    }
}
