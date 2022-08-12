import { Component, Input } from '@angular/core';
import { Game } from 'src/game/main';

@Component({
	selector: 'app-gameover-modal',
	templateUrl: './gameover-modal.component.html',
})
export class GameoverModalComponent {
	@Input() game: Game;
}
