/* eslint-disable curly */
import { Asset, AssetObstacle, assets, obstacles } from 'src/assets/assets';
import { WindowHelper } from '../helpers/window-helper';
import { between } from '../helpers/random';

import { Background } from '../objects/background';
import { Obstacle } from '../objects/obstacle';
import { Player } from '../objects/player';

export default class MainScene extends Phaser.Scene {
	public windowHelper: WindowHelper;

	public leftLane: number;
	public rightLane: number;

	public spawnedObstacles: Phaser.GameObjects.Group;

	public speed: number;
	public score: number;
	public isGameOver: boolean;

	public eventEmitter: Phaser.Events.EventEmitter;

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

	public preload() {
		this.isGameOver = false;
		this.score = 0;
		this.speed = 8;

		this.windowHelper = new WindowHelper(this);
		this.calculateRoutes();

		// Assets
		this.load.spritesheet(assets.player.key, assets.player.path, {
			frameWidth: 64,
			frameHeight: 113,
		});

		this.load.image(assets.background.key, assets.background.path);
		// this.load.image(assets.gameSizeBorder.key, assets.gameSizeBorder.path);
		// this.load.image(assets.verticalLine.key, assets.verticalLine.path);
		this.load.image(assets.horizontalLine.key, assets.horizontalLine.path);

		this.obstacles.forEach((obstacle) =>
			this.load.image(obstacle.key, obstacle.path)
		);
	}

	public create() {
		// this.add
		// 	.image(0, 0, assets.gameSizeBorder.key)
		// 	.setOrigin(0, 0)
		// 	.setDepth(1);

		this.background = new Background(this);
		this.player = new Player(this, assets.player);

		this.eventEmitter = new Phaser.Events.EventEmitter();

		const spawn = new Phaser.Time.TimerEvent({
			delay: 1000,
			loop: true,
			callback: this.eachSecond,
			callbackScope: this,
		});

		this.spawnedObstacles = this.add.group();

		this.time.addEvent(spawn);
	}

	public update(time: number) {
		this.background.update();

		this.spawnObstacles();
	}

	private eachSecond(): void {
		const ratio = 0.3;
		const baseScore = 10;

		this.player.updateAnimationSpeed();
		this.speed += ratio;
		this.score += Math.round(baseScore * (this.speed / 100));
	}

	private spawnObstacles(): void {
		if (this.spawnedObstacles.children.size) return;

		const randomIndex = between(0, this.obstacles.length);
		const obstacleToSpawn = this.obstacles[randomIndex];

		const obstacle = new Obstacle(this, obstacleToSpawn);

		this.spawnedObstacles.add(obstacle);

		this.physics.add.collider(this.player, this.spawnedObstacles, () => {
			this.isGameOver = true;
			this.scene.pause();
		});
	}

	private calculateRoutes(): void {
		// Calculate Position
		const deviceWidth = this.windowHelper.gameWidth;
		const sidewalkWidth = deviceWidth * 0.1528;
		const roadWidth = deviceWidth * 0.6944;

		this.leftLane = sidewalkWidth + roadWidth / 2 / 2;
		this.rightLane = this.leftLane + roadWidth / 2;
	}
}
