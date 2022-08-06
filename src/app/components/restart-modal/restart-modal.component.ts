import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/game/main';

@Component({
	selector: 'app-restart-modal',
	templateUrl: './restart-modal.component.html',
	styleUrls: ['./restart-modal.component.scss'],
})
export class RestartModalComponent implements OnInit {
	@Input() game: Game;

	constructor() {}

	ngOnInit() {}
}
