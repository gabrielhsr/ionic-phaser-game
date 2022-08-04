import { assets } from 'src/assets/assets';
import { DeviceWindow } from '../helpers/device-window';
import { between } from '../helpers/random';

import { Background } from '../objects/background';
import { Obstacle } from '../objects/obstacle';
import { Player } from '../objects/player';

export default class MainScene extends Phaser.Scene {
    public deviceWindow: DeviceWindow;

    public left: number;
    public right: number;

    private background: Background;
    private player: Player;

    private obstacles: Obstacle[] = [];

    constructor() {
        super('main');
    }

    public preload() {
        this.deviceWindow = new DeviceWindow(this);
        this.calculateRoutes();

        this.background = new Background(this);
        this.player = new Player(this);

        this.load.image(assets.obstacleHole.key, assets.obstacleHole.path);
        this.load.image(assets.obstacleCar.key, assets.obstacleCar.path);
        this.load.image(assets.obstacleTruck.key, assets.obstacleTruck.path);
        this.load.image(assets.obstacleVan.key, assets.obstacleVan.path);
    }

    public create() {
        this.background.render();

        this.obstacles.push(new Obstacle(this, assets.obstacleHole));
        this.obstacles.push(new Obstacle(this, assets.obstacleCar));
        this.obstacles.push(new Obstacle(this, assets.obstacleTruck));
        this.obstacles.push(new Obstacle(this, assets.obstacleVan));

        this.player.render();

        this.player.controls();

        const spawn = new Phaser.Time.TimerEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnObstacle,
            callbackScope: this,
        });

        this.time.addEvent(spawn);
    }

    public update() {
        // this.background.animate();
    }

    private calculateRoutes() {
        // Calculate Position
        const deviceWidth = this.deviceWindow.width;
        const sidewalkWidth = deviceWidth * 0.187963;
        const roadWidth = deviceWidth * 0.624074;

        this.left = sidewalkWidth + roadWidth / 2 / 2;
        this.right = this.left + roadWidth / 2;
    }

    private spawnObstacle() {
        const obstacleIndex = between(0, this.obstacles.length);

        // this.obstacles[obstacleIndex].spawn();
    }
}
