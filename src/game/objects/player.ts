import { assets } from 'src/assets/assets';
import MainScene from '../scenes/scene';

export class Player {
    private player: Phaser.GameObjects.Sprite;

    private isLeft = true;

    constructor(private scene: MainScene) {
        this.scene.load.spritesheet(assets.player.key, assets.player.path, {
            frameWidth: 180,
            frameHeight: 342,
        });
    }

    public render() {
        // Add Sprite to Scene
        this.player = this.scene.add.sprite(0, 0, assets.player.key);

        this.changeSide();

        // Add Animation and Play
        this.scene.anims.create({
            key: assets.player.key,
            frames: this.scene.anims.generateFrameNumbers(
                assets.player.key,
                null
            ),
            frameRate: 60,
            repeat: -1,
        });

        this.player.play(assets.player.key);
    }

    public controls() {
        this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            if (pointer.leftButtonReleased()) {
                this.changeSide();
            }
        });
    }

    private changeSide() {
        this.isLeft = !this.isLeft;

        const widthPosition = this.isLeft ? this.scene.right : this.scene.left;
        const heightPosition =
            this.scene.deviceWindow.height - this.player.height / 2 - 50;

        this.player.setPosition(widthPosition, heightPosition);
    }
}
