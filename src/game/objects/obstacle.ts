import { Asset } from 'src/assets/assets';
import { between } from '../helpers/random';
import MainScene from '../scenes/scene';

export class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(public scene: MainScene, private asset: Asset) {
        const route = between(0, 2) === 1 ? scene.leftLane : scene.rightLane;
        const sprite = scene.textures.get(asset.key).getSourceImage();

        super(scene, route, -(sprite.height / 2), asset.key);

        scene.add.existing(this);
    }

    protected preUpdate(time: number, delta: number): void {
        // Move down
        this.y += 8 - this.asset.speed;

        if (this.y - this.height > this.scene.deviceWindow.height) {
            const index = this.scene.spawnedObstacles.indexOf(this);

            this.scene.spawnedObstacles.splice(index, 1);
            this.destroy();
        }
    }
}
