/* eslint-disable curly */
export class WindowHelper {
	public fixedWidth = 360;
	public fixedHeight = 640;

	private gameView: Phaser.Structs.Size;
	private deviceView: Phaser.Structs.Size;

	constructor(private scene: Phaser.Scene) {
		this.deviceView = new Phaser.Structs.Size(
			this.fixedWidth,
			this.fixedHeight
		);
		this.gameView = new Phaser.Structs.Size(
			this.fixedWidth,
			this.fixedHeight,
			Phaser.Structs.Size.FIT,
			this.deviceView
		);

		this.scene.scale.on('resize', this.resize, this);
		this.scene.scale.refresh();
	}

	private updateCamera(): void {
		const camera = this.scene.cameras.main;
		const scaleX = this.gameView.width / this.fixedWidth;
		const scaleY = this.gameView.height / this.fixedHeight;
		const halfFixedHeight = this.fixedHeight / 2;
		const halfDeviceHeight = this.deviceView.height / 2;
		const halfGameHeight = this.gameView.height / 2;

		const centerX = this.fixedWidth / 2;
		const centerY =
			halfFixedHeight -
			(halfDeviceHeight / scaleY - halfGameHeight / scaleY);

		camera.setZoom(Math.max(scaleX, scaleY));
		camera.centerOn(centerX, centerY);
	}

	private resize(gameSize: Phaser.Structs.Size): void {
		const width = gameSize.width;
		const height = gameSize.height;

		this.deviceView.setSize(width, height);
		this.gameView.setSize(width, height);

		this.updateCamera();
	}
}
