import { Asset } from 'src/assets/assets';
import { between } from '../helpers/random';
import MainScene from '../scenes/scene';

export class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(public scene: MainScene, private asset: Asset) {
        const route = between(0, 2) === 1 ? scene.leftLane : scene.rightLane;
        const sprite = scene.textures.get(asset.key).getSourceImage();

        super(scene, route, -(sprite.height / 2), asset.key);

        scene.physics.add.existing(this);
        scene.add.existing(this);

        console.log('spawn', new Date().toISOString());
    }

    protected preUpdate(time: number, delta: number): void {
        // Move down
        this.y +=
            this.scene.speed - this.scene.speed * (this.asset.speed / 500);

        if (this.y - this.height > this.scene.deviceWindow.height) {
            this.destroy();

            console.log('kill ', new Date().toISOString());
        }
    }
}
