import MainScene from '../scenes/scene';

export class Background {
	private lines: Phaser.GameObjects.Group;

	private middleScreen: number;
	private deviceHeight: number;
	private zeroY: number;

	constructor(public scene: MainScene) {
		this.middleScreen = scene.screen.gameWidth / 2;

		this.deviceHeight = scene.screen.deviceHeight;
		this.zeroY = scene.screen.trueZero.y;

		this.lines = scene.add.group();

		this.create();
	}

	private create(): void {
		// Road
		this.scene.add
			.rectangle(50, this.zeroY, 260, this.deviceHeight, 0xc7dda0)
			.setOrigin(0);

		// SideLines
		this.scene.add
			.line(55, this.zeroY, 0, 0, 0, this.deviceHeight, 0x003401)
			.setLineWidth(2)
			.setOrigin(0);

		this.scene.add
			.line(305, this.zeroY, 0, 0, 0, this.deviceHeight, 0x003401)
			.setLineWidth(2)
			.setOrigin(0);

		// Dashed Stripes
		for (
			let index = this.deviceHeight;
			index >= this.zeroY - 120;
			index -= 120
		) {
			const line = new Phaser.GameObjects.Line(
				this.scene,
				this.middleScreen,
				index,
				0,
				0,
				0,
				60,
				0x003401
			)
				.setLineWidth(2)
				.setOrigin(0.5, 0);

			this.lines.add(line, true);
		}
	}

	public update(): void {
		const first = this.lines.getChildren()[0] as Phaser.GameObjects.Line;
		const last = this.lines.getChildren()[
			this.lines.getLength() - 1
		] as Phaser.GameObjects.Line;

		this.lines.incY(this.scene.speed);

		const line = new Phaser.GameObjects.Line(
			this.scene,
			this.middleScreen,
			this.zeroY - 120,
			0,
			0,
			0,
			60,
			0x003401
		)
			.setLineWidth(2)
			.setOrigin(0.5, 0);

		if (last?.y >= this.zeroY) {
			this.lines.remove(first);
			this.lines.add(line, true);
		}
	}
}
