import { Asset } from 'src/assets/assets';
import { between } from '../helpers/random';
import MainScene from '../scenes/scene';

export class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene: MainScene, asset: Asset) {
        const route = between(0, 2) === 1 ? scene.leftLane : scene.rightLane;
        const sprite = scene.textures.get(asset.key).getSourceImage();

        super(scene, route, -(sprite.height / 2), asset.key);

        scene.add.existing(this);
    }
}
