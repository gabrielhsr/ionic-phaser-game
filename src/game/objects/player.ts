import { Asset, assets } from 'src/assets/assets';
import MainScene from '../scenes/scene';

export class Player extends Phaser.GameObjects.Sprite {
    private isLeft = true;

    constructor(public scene: MainScene, asset: Asset) {
        super(scene, 0, 0, asset.key);

        scene.add.existing(this);

        this.load();
        this.controls();
    }

    private controls() {
        this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            if (pointer.leftButtonReleased()) {
                this.changeSide();
            }
        });
    }

    private load() {
        // Add Sprite to Scene
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

        this.play(assets.player.key);
    }

    private changeSide() {
        this.isLeft = !this.isLeft;

        const widthPosition = this.isLeft
            ? this.scene.rightLane
            : this.scene.leftLane;
        const heightPosition =
            this.scene.deviceWindow.height - this.height / 2 - 50;

        this.setPosition(widthPosition, heightPosition);
    }
}
