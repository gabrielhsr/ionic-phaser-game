import { assets } from 'src/assets/assets';
import MainScene from './scenes/scene';

export class Player {
    private player: Phaser.GameObjects.Sprite;

    constructor(private scene: MainScene) {
        this.scene.load.spritesheet(assets.player.name, assets.player.path, {
            frameWidth: 180,
            frameHeight: 342,
        });
    }

    public render() {
        this.player = this.scene.add.sprite(0, 0, assets.player.name);

        const sidewalkWidth = this.scene.deviceWindow.width * 0.187963;
        const positionLeft =
            sidewalkWidth + (this.scene.deviceWindow.width * 0.624074) / 2 / 2;

        const positionRight =
            positionLeft + (this.scene.deviceWindow.width * 0.624074) / 2;

        // this.add
        //     .line(0, 0, position, 0, position, this.deviceHeight, 0xff0000)
        //     .setOrigin(0, 0);

        this.player.setPosition(
            positionLeft,
            this.scene.deviceWindow.height - this.player.height / 2 - 50
        );

        this.scene.anims.create({
            key: assets.player.key,
            frames: this.scene.anims.generateFrameNumbers(
                assets.player.name,
                null
            ),
            frameRate: 60,
            repeat: -1,
        });

        this.player.play(assets.player.key);
    }
}
