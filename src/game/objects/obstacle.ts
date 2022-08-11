import { AssetObstacle } from 'src/assets/assets';
import { between } from '../helpers/random';
import MainScene from '../scenes/scene';

export class Obstacle extends Phaser.GameObjects.Sprite {
	constructor(public scene: MainScene, private asset: AssetObstacle) {
		const route = between(0, 2) === 1 ? scene.leftLane : scene.rightLane;
		const sprite = scene.textures.get(asset.key).getSourceImage();

		const randomDistance =
			between(Math.abs(scene.windowHelper.trueZero.y), 1000) +
			sprite.height * asset.scale;

		super(scene, route, -randomDistance, asset.key);

		scene.physics.add.existing(this);
		scene.add.existing(this);

		this.setOrigin(0.5, 0);

		if (this.asset.scale) this.setScale(this.asset.scale);
	}

	protected preUpdate(time: number, delta: number): void {
		// Move down
		this.y +=
			this.scene.speed - this.scene.speed * (this.asset.speed / 500);

		if (this.y >= this.scene.windowHelper.deviceHeight) {
			this.destroy();
		}
	}
}
