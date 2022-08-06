/* eslint-disable curly */
export class DeviceWindow {
	public width = window.innerWidth * window.devicePixelRatio;
	public height = window.innerHeight * window.devicePixelRatio;

	public sizer: Phaser.Structs.Size;
	private parent: Phaser.Structs.Size;

	constructor(private scene: Phaser.Scene) {
		this.parent = new Phaser.Structs.Size(this.width, this.height);
		this.sizer = new Phaser.Structs.Size(
			this.width,
			this.height,
			Phaser.Structs.Size.FIT,
			this.parent
		);

		this.updateCamera();

		this.scene.scale.on('resize', this.resize, this);
		this.scene.game.scale.refresh();
	}

	private updateCamera(): void {
		const camera = this.scene.cameras.main;

		const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
		const y = 0;
		const scaleX = this.sizer.width / this.width;
		const scaleY = this.sizer.height / this.height;

		camera.setViewport(x, y, this.sizer.width, this.sizer.height);
		camera.setZoom(Math.max(scaleX, scaleY));
		camera.centerOn(this.width / 2, this.height / 2);
	}

	private resize(gameSize: Phaser.Structs.Size): void {
		const width = gameSize.width;
		const height = gameSize.height;

		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);

		this.updateCamera();
	}
}
