import { Component } from '@angular/core';
import { Game } from 'src/game/main';

@Component({
	selector: 'app-game',
	templateUrl: './game.page.html',
	styleUrls: ['./game.page.scss'],
})
export class GamePage {
	public game: Game;

	ionViewWillEnter() {
		this.game?.destroy();
	}

	ionViewDidEnter() {
		this.game = new Game();
	}
}
