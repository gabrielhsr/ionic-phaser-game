import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/game/main';

@Component({
	selector: 'app-game',
	templateUrl: './game.page.html',
	styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
	public game: Game;

	constructor() {}

	ngOnInit() {
		this.game = new Game();
	}
}
