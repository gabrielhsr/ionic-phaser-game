import MainScene from '../scenes/scene';

import { between } from '../helpers/random';
import { AssetObstacle } from 'src/assets/assets';

export class Obstacle extends Phaser.GameObjects.Sprite {
	constructor(public scene: MainScene, private asset: AssetObstacle) {
		const route = between(0, 2) === 1 ? scene.leftLane : scene.rightLane;
		const sprite = scene.textures.get(asset.key).getSourceImage();

		const randomDistance =
			between(Math.abs(scene.screen.trueZero.y), 1000) +
			sprite.height * asset.scale;

		super(scene, route, -randomDistance, asset.key);

		scene.physics.add.existing(this);
		scene.add.existing(this);

		this.setOrigin(0.5, 0);
		this.setScale(this.asset.scale);
	}

	protected preUpdate(): void {
		// Move down
		this.y +=
			this.scene.speed - this.scene.speed * (this.asset.speed / 500);

		if (this.y >= this.scene.screen.deviceHeight) {
			this.destroy();
		}
	}
}
