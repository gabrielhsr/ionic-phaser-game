import { Asset } from 'src/assets/assets';
import { between } from '../helpers/random';
import MainScene from '../scenes/scene';

export class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene: MainScene, private asset: Asset) {
        super(scene, scene.deviceWindow.width / 2, 50, asset.key);

        scene.add.existing(this);
    }

    protected preUpdate(time: number, delta: number): void {
        // console.log('aaa');
    }
    // private obstacle: Phaser.GameObjects.Sprite;

    // constructor(private scene: MainScene, private asset: Asset) {
    //     this.scene.load.image(asset.key, asset.path);
    // }

    // public spawn() {
    //     const route = between(0, 2) === 1 ? this.scene.left : this.scene.right;

    //     const image = this.scene.textures.get(this.asset.key).getSourceImage();

    //     // Add Sprite to Scene
    //     this.obstacle = this.scene.add.sprite(
    //         route,
    //         -image.height,
    //         this.asset.key
    //     );
    // }

    // public animate() {}
}
