import { Component, Input } from '@angular/core';
import { Game } from 'src/app/game/main';

@Component({
	selector: 'app-pause-modal',
	templateUrl: './pause-modal.component.html',
	styleUrls: ['./pause-modal.component.scss'],
})
export class PauseModalComponent {
	@Input() game: Game;
}
