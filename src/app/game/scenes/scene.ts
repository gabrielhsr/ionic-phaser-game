import { AssetObstacle, obstacles, player } from 'src/assets/assets';

import { WindowHelper } from '../helpers/window-helper';
import { between } from '../helpers/random';

import { Background } from '../objects/background';
import { Obstacle } from '../objects/obstacle';
import { Player } from '../objects/player';

export default class MainScene extends Phaser.Scene {
	public screen: WindowHelper;

	public leftLane: number;
	public rightLane: number;

	public spawnedObstacles: Phaser.GameObjects.Group;

	public speed: number;
	public score: number;
	public isGameOver: boolean;

	private background: Background;
	private player: Player;

	private obstacles: AssetObstacle[] = [
		obstacles.obstacleHole,
		obstacles.obstacleCar,
		obstacles.obstacleTruck,
		obstacles.obstacleVan,
	];

	constructor() {
		super({ key: 'main' });
	}

	public preload(): void {
		this.screen = new WindowHelper(this);

		this.isGameOver = false;
		this.score = 0;
		this.speed = 8;

		this.calculateLanes();

		// Assets
		this.load.spritesheet(player.default.key, player.default.path, {
			frameWidth: player.default.frameWidth,
			frameHeight: player.default.frameHeight,
		});

		this.obstacles.forEach((obstacle) =>
			this.load.image(obstacle.key, obstacle.path)
		);

		// Helpers
		// this.load.image(assets.gameSizeBorder.key, assets.gameSizeBorder.path);
		// this.load.image(assets.verticalLine.key, assets.verticalLine.path);
		// this.load.image(assets.horizontalLine.key, assets.horizontalLine.path);
	}

	public create(): void {
		this.background = new Background(this);
		this.player = new Player(this, player.default);

		this.spawnedObstacles = this.add.group();

		const timerConfig = {
			delay: 1000,
			loop: true,
			callback: this.eachSecond,
			callbackScope: this,
		};

		this.time.addEvent(new Phaser.Time.TimerEvent(timerConfig));
	}

	public update(): void {
		this.background.update();
		this.player.update();

		this.spawnObstacles();
	}

	private eachSecond(): void {
		const ratio = 0.3;
		const baseScore = 10;

		this.speed += ratio;
		this.score += Math.round(baseScore * (this.speed / 100));
	}

	private spawnObstacles(): void {
		if (this.spawnedObstacles.getLength()) return;

		const randomIndex = between(0, this.obstacles.length);
		const obstacleToSpawn = this.obstacles[randomIndex];

		const obstacle = new Obstacle(this, obstacleToSpawn);

		this.spawnedObstacles.add(obstacle);

		this.physics.add.collider(this.player, this.spawnedObstacles, () => {
			this.isGameOver = true;
			this.scene.pause();
		});
	}

	private calculateLanes(): void {
		// Calculate Position
		const deviceWidth = this.screen.gameWidth;
		const sidewalkWidth = deviceWidth * 0.1528;
		const roadWidth = deviceWidth * 0.6944;

		this.leftLane = sidewalkWidth + roadWidth / 2 / 2;
		this.rightLane = this.leftLane + roadWidth / 2;
	}
}
