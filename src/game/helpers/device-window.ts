/* eslint-disable curly */
export class DeviceWindow {
	public width = 360;
	public height = 640;

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

		console.log(this.width, this.height);

		this.scene.scale.on('resize', this.resize, this);
		this.scene.scale.refresh();
	}

	private updateCamera(): void {
		const camera = this.scene.cameras.main;
		const scaleX = this.sizer.width / this.width;
		const scaleY = this.sizer.height / this.height;

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
