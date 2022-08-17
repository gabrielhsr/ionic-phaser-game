import { Component, OnDestroy, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Subscription } from 'rxjs';

import { Score, ScoreService } from 'src/app/shared/services/score.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.page.html',
	styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {
	public app = App;
	public scores: Score[] = [];

	private scores$: Subscription;

	constructor(private scoreService: ScoreService) {}

	ngOnInit(): void {
		this.scores$ = this.scoreService.storedScores.subscribe(
			(scores) => (this.scores = scores)
		);
	}

	ngOnDestroy(): void {
		this.scores$.unsubscribe();
	}
}
