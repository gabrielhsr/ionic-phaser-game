import * as Phaser from 'phaser';

import MainScene from './scenes/scene';

import { colors } from './helpers/colors';
import { BehaviorSubject, Observable } from 'rxjs';

export class Game {
	public game: Phaser.Game;

	public get score(): Observable<number> {
		return this._score.asObservable();
	}

	public get isGameOver(): Observable<boolean> {
		return this._isGameOver.asObservable();
	}

	public get isPaused(): Observable<boolean> {
		return this._isPaused.asObservable();
	}

	// Observables
	private _score = new BehaviorSubject<number>(0);
	private _isGameOver = new BehaviorSubject<boolean>(false);
	private _isPaused = new BehaviorSubject<boolean>(false);

	// Scenes
	private mainScene: MainScene;

	// Config
	private config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		scene: [MainScene],
		pixelArt: true,
		backgroundColor: colors.backgroundColor,
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

		// Listeners of MainScene
		this.game.events.on('poststep', () => {
			this.mainScene = this.game.scene.getScene('main') as MainScene;
			if (this.mainScene.isGameOver) return;

			this.mainScene.events.once('update', () => {
				this._score.next(this.mainScene.score);
				this._isGameOver.next(this.mainScene.isGameOver);
			});
		});
	}

	public togglePause() {
		if (this.game.scene.isPaused('main')) {
			this.game.scene.resume('main');
		} else {
			this.game.scene.pause('main');
		}
	}

	public pause() {
		this.game.scene.pause('main');
		this._isPaused.next(true);
	}

	public resume() {
		this.game.scene.resume('main');
		this._isPaused.next(false);
	}

	public restart() {
		if (!this.mainScene) return;

		this._isGameOver.next(false);
		this._isPaused.next(false);
		this._score.next(0);
		this.mainScene.scene.restart();
	}

	public destroy() {
		this.game.destroy(true);
	}
}
