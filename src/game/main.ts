import * as Phaser from 'phaser';
import { BehaviorSubject, Observable } from 'rxjs';
import MainScene from './scenes/scene';

export class Game {
	public game: Phaser.Game;

	public get score(): Observable<number> {
		return this._score.asObservable();
	}

	public get isGameOver(): Observable<boolean> {
		return this._isGameOver.asObservable();
	}

	public get fps(): Observable<number> {
		return this._fps.asObservable();
	}

	private _score = new BehaviorSubject<number>(0);
	private _isGameOver = new BehaviorSubject<boolean>(false);
	private _fps = new BehaviorSubject<number>(0);

	private mainScene: MainScene;

	private config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		scene: [MainScene],
		pixelArt: true,
		backgroundColor: '0x003401',
		scale: {
			mode: Phaser.Scale.RESIZE,
			parent: 'game-phaser',
		},
		physics: {
			default: 'arcade',
			arcade: { debug: false },
		},
		fps: {
			target: 60,
			forceSetTimeOut: true,
		},
	};

	constructor() {
		this.game = new Phaser.Game(this.config);

		this.game.events.on('poststep', () => {
			this.mainScene = this.game.scene.getScene('main') as MainScene;

			if (this.mainScene.isGameOver) return;

			this.mainScene.events.once('update', () => {
				this._score.next(this.mainScene.score);
				this._isGameOver.next(this.mainScene.isGameOver);
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

		this._isGameOver.next(false);
		this._score.next(0);
		this.mainScene.scene.restart();
	}
}
