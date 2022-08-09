/* eslint-disable curly */
/* eslint-disable @typescript-eslint/member-ordering */
import * as Phaser from 'phaser';
import { BehaviorSubject, Observable } from 'rxjs';
import MainScene from './scenes/scene';

export class Game {
	public game: Phaser.Game;

	public get score(): Observable<number> {
		return this.scoreSubject.asObservable();
	}

	public get isGameOver(): Observable<boolean> {
		return this.gameOverSubject.asObservable();
	}

	private scoreSubject = new BehaviorSubject<number>(0);
	private gameOverSubject = new BehaviorSubject<boolean>(false);

	private mainScene: MainScene;

	private config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		scene: [MainScene],
		pixelArt: true,
		backgroundColor: '0x003401',
		scale: {
			mode: Phaser.Scale.RESIZE,
			parent: 'game_phaser',
		},
		physics: {
			default: 'arcade',
			arcade: { debug: false },
		},
	};

	constructor() {
		this.game = new Phaser.Game(this.config);

		this.game.events.on('poststep', () => {
			this.mainScene = this.game.scene.getScene('main') as MainScene;

			if (this.mainScene.isGameOver) return;

			this.mainScene.events.once('update', () => {
				this.scoreSubject.next(this.mainScene.score);
				this.gameOverSubject.next(this.mainScene.isGameOver);
			});
		});
	}

	public playPause() {
		if (this.game.scene.isPaused('main')) {
			this.game.scene.resume('main');
		} else {
			this.game.scene.pause('main');
		}
	}

	public restart() {
		if (!this.mainScene) return;

		this.gameOverSubject.next(false);
		this.scoreSubject.next(0);
		this.mainScene.scene.restart();
	}
}
