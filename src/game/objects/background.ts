import MainScene from '../scenes/scene';

export class Background {
	private lines: Phaser.GameObjects.Group;

	private height: number;
	private middleWidth: number;

	constructor(public scene: MainScene) {
		this.height = scene.windowHelper.gameHeight * 2;
		this.middleWidth = scene.windowHelper.gameWidth / 2;

		this.lines = scene.add.group();

		this.create();
	}

	create() {
		// Road
		this.scene.add
			.rectangle(50, 0, 260, this.height, 0xc7dda0)
			.setOrigin(0, 0.5);

		// SideLines
		this.scene.add
			.line(55, 0, 0, 0, 0, this.height, 0x003401)
			.setLineWidth(2)
			.setOrigin(0, 0.5);

		this.scene.add
			.line(305, 0, 0, 0, 0, this.height, 0x003401)
			.setLineWidth(2)
			.setOrigin(0, 0.5);

		// Dashed Stripes
		for (let index = -1000000; index < 1; index += 120) {
			this.lines.add(
				this.scene.add
					.line(this.middleWidth, index, 0, 0, 0, 60, 0x003401)
					.setLineWidth(2)
			);
		}
	}

	update() {
		this.lines.incY(this.scene.speed);
	}
}
