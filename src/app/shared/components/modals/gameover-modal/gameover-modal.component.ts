import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/game/main';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
	selector: 'app-gameover-modal',
	templateUrl: './gameover-modal.component.html',
	styleUrls: ['./gameover-modal.component.scss'],
})
export class GameoverModalComponent implements OnInit, OnDestroy {
	@Input() game: Game;

	score$: Subscription;
	score: number;

	constructor(private scoreService: ScoreService) {}

	public ngOnInit(): void {
		this.score$ = this.game.score.subscribe(
			(score) => (this.score = score)
		);
	}

	public ngOnDestroy(): void {
		this.score$.unsubscribe();
	}

	public restartAndSubmit(): void {
		this.scoreService.set('GHS', this.score);

		this.game.restart();
	}
}
