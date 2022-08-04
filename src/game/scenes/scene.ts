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

    private background: Background;
    private player: Player;

    private obstacles: Asset[] = [
        assets.obstacleHole,
        assets.obstacleCar,
        assets.obstacleTruck,
        assets.obstacleVan,
    ];

    private spawnedObstacles: Obstacle[] = [];

    constructor() {
        super('main');
    }

    public preload() {
        this.deviceWindow = new DeviceWindow(this);
        this.calculateRoutes();

        // Assets
        this.load.spritesheet(assets.player.key, assets.player.path, {
            frameWidth: 180,
            frameHeight: 342,
        });

        this.load.image(assets.background.key, assets.background.path);

        this.obstacles.forEach((obstacle) =>
            this.load.image(obstacle.key, obstacle.path)
        );
    }

    public create() {
        this.background = new Background(this, assets.background);
        this.player = new Player(this, assets.player);

        const spawn = new Phaser.Time.TimerEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnObstacle,
            callbackScope: this,
        });

        this.time.addEvent(spawn);
    }

    public update() {
        // console.log(this.spawnedObstacles);
    }

    private spawnObstacle(): void {
        if (this.spawnedObstacles.length) return;

        const obstacleToSpawn =
            this.obstacles[between(0, this.obstacles.length)];

        const obstacleSpawned = new Obstacle(this, obstacleToSpawn);

        this.spawnedObstacles.push(obstacleSpawned);
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
