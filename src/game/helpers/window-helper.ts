export class WindowHelper {
	public gameWidth = 360;
	public gameHeight = 640;

	public deviceHeight = 0;
	public deviceWidth = 0;

	public trueZero = { y: 0, x: 0 };

	private gameView: Phaser.Structs.Size;
	private deviceView: Phaser.Structs.Size;

	constructor(private scene: Phaser.Scene) {
		this.deviceView = new Phaser.Structs.Size(
			this.gameWidth,
			this.gameHeight
		);

		this.gameView = new Phaser.Structs.Size(
			this.gameWidth,
			this.gameHeight,
			Phaser.Structs.Size.FIT,
			this.deviceView
		);

		this.scene.scale.on('resize', this.resize, this);
		this.scene.scale.refresh();
	}

	private updateCamera(): void {
		const camera = this.scene.cameras.main;
		const scaleX = this.gameView.width / this.gameWidth;
		const scaleY = this.gameView.height / this.gameHeight;
		const halfFixedHeight = this.gameHeight / 2;
		const halfDeviceHeight = this.deviceView.height / 2;
		const halfGameHeight = this.gameView.height / 2;

		const centerX = this.gameWidth / 2;
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

		this.calculateDevice();
		this.updateCamera();
	}

	private calculateDevice(): void {
		const scaleX = this.gameView.width / this.gameWidth;
		const scaleY = this.gameView.height / this.gameHeight;

		this.deviceHeight = this.deviceView.height / scaleY;
		this.deviceWidth = this.deviceView.width / scaleX;

		this.trueZero.y = this.gameHeight - this.deviceHeight;
		this.trueZero.x = this.gameWidth - this.deviceWidth;
	}
}
