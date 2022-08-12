import { Component, OnInit } from '@angular/core';
import { Game } from 'src/game/main';

@Component({
	selector: 'app-game',
	templateUrl: './game.page.html',
	styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
	public game: Game;

	ngOnInit() {
		this.game = new Game();
	}
}
