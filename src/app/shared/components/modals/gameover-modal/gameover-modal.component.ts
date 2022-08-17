import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Game } from 'src/app/game/main';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
	selector: 'app-gameover-modal',
	templateUrl: './gameover-modal.component.html',
	styleUrls: ['./gameover-modal.component.scss'],
})
export class GameoverModalComponent implements OnInit {
	@Input() game: Game;

	public form = this.formBuilder.group({
		player: ['', [Validators.minLength(3), Validators.maxLength(3)]],
	});

	private score$: Subscription;
	private lastPlayer$: Subscription;

	public score = 0;
	public bestScore: number;

	constructor(
		private formBuilder: FormBuilder,
		private scoreService: ScoreService
	) {}

	public ngOnInit(): void {
		this.score$ = this.game.score.subscribe((score) => {
			if (score > 0) {
				this.score = score;
			}
		});

		this.bestScore = this.scoreService.getBestScore();

		this.lastPlayer$ = this.scoreService.lastPlayer.subscribe((player) => {
			if (player) this.form.controls.player.setValue(player);
		});
	}

	public onExit(): void {
		if (this.form.value.player) {
			this.scoreService.save(this.form.value.player, this.score);
		}

		this.score$.unsubscribe();
		this.lastPlayer$.unsubscribe();
	}

	public restart(): void {
		this.onExit();
		this.game.restart();
	}
}
