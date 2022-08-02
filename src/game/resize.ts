export class ResizeHelper {
    private parent: Phaser.Structs.Size;
    private sizer: Phaser.Structs.Size;

    constructor(
        private gameWidth: number,
        private gameHeight: number,
        private scene: Phaser.Scene
    ) {
        this.parent = new Phaser.Structs.Size(this.gameWidth, this.gameHeight);
        this.sizer = new Phaser.Structs.Size(
            this.gameWidth,
            this.gameHeight,
            Phaser.Structs.Size.FIT,
            this.parent
        );

        this.updateCamera();

        this.scene.scale.on('resize', this.resize, this);
        this.scene.game.scale.refresh();
    }

    private updateCamera(): void {
        const camera = this.scene.cameras.main;

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = 0;
        const scaleX = this.sizer.width / this.gameWidth;
        const scaleY = this.sizer.height / this.gameHeight;

        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(this.gameWidth / 2, this.gameHeight / 2);
    }

    private resize(gameSize: Phaser.Structs.Size): void {
        const width = gameSize.width;
        const height = gameSize.height;

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();
    }
}
