/* eslint-disable curly */
import { Asset, assets } from 'src/assets/assets';
import { DeviceWindow } from '../helpers/device-window';
import { between } from '../helpers/random';

import { Background } from '../objects/background';
import { Obstacle } from '../objects/obstacle';
import { Player } from '../objects/player';

export default class MainScene extends Phaser.Scene {
	public deviceWindow: DeviceWindow;

	public leftLane: number;
	public rightLane: number;

	public spawnedObstacles: Phaser.GameObjects.Group;

	public speed: number;
	public score: number;
	public isGameOver: boolean;

	public eventEmitter: Phaser.Events.EventEmitter;

	private background: Background;
	private player: Player;

	private obstacles: Asset[] = [
		assets.obstacleHole,
		assets.obstacleCar,
		assets.obstacleTruck,
		assets.obstacleVan,
	];

	constructor() {
		super({ key: 'main' });
	}

	public preload() {
		this.isGameOver = false;
		this.score = 0;
		this.speed = 10;

		this.deviceWindow = new DeviceWindow(this);
		this.calculateRoutes();

		// Assets
		this.load.spritesheet(assets.player.key, assets.player.path, {
			frameWidth: 64,
			frameHeight: 113,
		});

		this.load.image(assets.background.key, assets.background.path);

		this.obstacles.forEach((obstacle) =>
			this.load.image(obstacle.key, obstacle.path)
		);
	}

	public create() {
		this.background = new Background(this, assets.background);
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
		const deviceWidth = this.deviceWindow.width;
		const sidewalkWidth = deviceWidth * 0.187963;
		const roadWidth = deviceWidth * 0.624074;

		this.leftLane = sidewalkWidth + roadWidth / 2 / 2;
		this.rightLane = this.leftLane + roadWidth / 2;
	}
}
