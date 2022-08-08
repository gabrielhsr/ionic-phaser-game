import { Asset, assets } from 'src/assets/assets';
import { between } from '../helpers/random';
import MainScene from '../scenes/scene';

export class Player extends Phaser.Physics.Arcade.Sprite {
	private isLeft = true;

	constructor(public scene: MainScene, asset: Asset) {
		super(scene, 0, 0, asset.key);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.load();
		this.controls();
	}

	public updateAnimationSpeed(): void {
		this.anims.timeScale = this.scene.speed / 10;
	}

	private controls() {
		this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			if (pointer.leftButtonReleased()) {
				this.changeSide();
			}
		});
	}

	private load() {
		const laneToSpawn = between(0, 2) === 1 ? true : false;
		this.isLeft = laneToSpawn;

		// Add Sprite to Scene
		this.changeSide();

		// Add Animation and Play
		this.scene.anims.create({
			key: assets.player.key,
			frames: this.scene.anims.generateFrameNumbers(
				assets.player.key,
				null
			),
			frameRate: 60,
			repeat: -1,
		});

		this.play(assets.player.key);
	}

	private changeSide() {
		this.isLeft = !this.isLeft;

		const widthPosition = this.isLeft
			? this.scene.rightLane
			: this.scene.leftLane;
		const heightPosition =
			this.scene.deviceWindow.height - this.displayHeight / 2 - 25;

		this.setPosition(widthPosition, heightPosition);
	}
}
