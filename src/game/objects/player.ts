import MainScene from '../scenes/scene';

import { between } from '../helpers/random';
import { Asset, player } from 'src/assets/assets';

export class Player extends Phaser.Physics.Arcade.Sprite {
	private isLeft = true;

	constructor(public scene: MainScene, asset: Asset) {
		super(scene, 0, 0, asset.key);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.load();
		this.controls();
	}

	public update(): void {
		this.anims.timeScale = this.scene.speed / 10;
	}

	private controls(): void {
		this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			if (pointer.leftButtonReleased()) {
				this.changeSide();
			}
		});
	}

	private load(): void {
		const laneToSpawn = between(0, 2) === 1 ? true : false;
		this.isLeft = laneToSpawn;

		this.changeSide();

		const animOpts = {
			key: player.default.key,
			frames: this.scene.anims.generateFrameNumbers(
				player.default.key,
				null
			),
			frameRate: 60,
			repeat: -1,
		};

		this.scene.anims.create(animOpts);
		this.play(player.default.key);
	}

	private changeSide(): void {
		this.isLeft = !this.isLeft;

		const widthPosition = this.isLeft
			? this.scene.rightLane
			: this.scene.leftLane;
		const heightPosition =
			this.scene.screen.gameHeight - this.displayHeight / 2 - 25;

		this.setPosition(widthPosition, heightPosition);
	}
}
