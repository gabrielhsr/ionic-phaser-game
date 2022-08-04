import { assets } from 'src/assets/assets';
import { DeviceWindow } from '../helpers/device-window';
import { between } from '../helpers/random';

import { Background } from '../objects/background';
import { Obstacle } from '../objects/obstacle';
import { Player } from '../objects/player';

export default class MainScene extends Phaser.Scene {
    public deviceWindow: DeviceWindow;

    private background: Background;
    private player: Player;

    private obstacles: Obstacle[] = [];

    constructor() {
        super('main');
    }

    public preload() {
        this.deviceWindow = new DeviceWindow(this);

        this.background = new Background(this);
        this.player = new Player(this);

        this.obstacles.push(new Obstacle(this, assets.obstacleHole));
        this.obstacles.push(new Obstacle(this, assets.obstacleCar));
        this.obstacles.push(new Obstacle(this, assets.obstacleTruck));
        this.obstacles.push(new Obstacle(this, assets.obstacleVan));
    }

    public create() {
        this.background.render();
        this.player.render();

        this.player.controls();

        const spawn = new Phaser.Time.TimerEvent({
            delay: 1000,
            loop: true,
            callback: this.spawn,
            callbackScope: this,
        });

        this.time.addEvent(spawn);
    }

    public update() {
        this.background.animate();
    }

    private spawn() {
        const obstacleIndex = between(0, this.obstacles.length);

        this.obstacles[obstacleIndex].render();
    }
}
