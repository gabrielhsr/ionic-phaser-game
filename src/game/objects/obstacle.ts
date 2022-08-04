import { Asset } from 'src/assets/assets';
import MainScene from '../scenes/scene';

export class Obstacle {
    private obstacle: Phaser.GameObjects.Sprite;

    constructor(private scene: MainScene, private asset: Asset) {
        this.scene.load.image(asset.name, asset.path);
    }

    public render() {
        // Add Sprite to Scene
        this.obstacle = this.scene.add.sprite(0, 0, this.asset.name);
    }
}
