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
export class GameoverModalComponent
	implements OnInit, OnDestroy, AfterViewInit
{
	@Input() game: Game;
	@ViewChild('playerInput') playerInput: ElementRef;

	public form = this.formBuilder.group({
		player: ['', [Validators.minLength(3), Validators.maxLength(3)]],
	});

	public score$: Subscription;
	public score: number;

	constructor(
		private formBuilder: FormBuilder,
		private scoreService: ScoreService
	) {}

	public ngOnInit(): void {
		this.score$ = this.game.score.subscribe(
			(score) => (this.score = score)
		);
	}

	public ngOnDestroy(): void {
		this.score$.unsubscribe();
	}

	public ngAfterViewInit(): void {
		this.playerInput.nativeElement.focus();
	}

	public restartAndSubmit(): void {
		if (this.form.value.player) {
			this.scoreService.save(this.form.value.player, this.score);
		}

		this.game.restart();
	}
}
