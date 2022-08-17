import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root',
})
export class ScoreService {
	private _storedScores = new BehaviorSubject<Score[]>([]);
	private _lastPlayer = new BehaviorSubject<string>('');

	constructor() {
		this._storedScores.next(this.getScoreStored('scores'));
		this._lastPlayer.next(this.getLastPlayer());
	}

	public get storedScores(): Observable<Score[]> {
		return this._storedScores.asObservable();
	}

	public get lastPlayer(): Observable<string> {
		return this._lastPlayer.asObservable();
	}

	public save(player: string, score: number) {
		this.setLastPlayer(player);

		const key = 'scores';
		const data: Score = { id: uuid(), player, score };

		const scores = this.getScoreStored(key);

		if (scores.length < 5) {
			scores.push(data);
		} else {
			const lowerScores = scores.filter((x) => x.score <= score);

			if (lowerScores.length) {
				const first = lowerScores[0];

				const indexToAdd = scores.findIndex((x) => x.id === first.id);

				scores.splice(indexToAdd, 0, data);
				scores.pop();
			}
		}

		this.saveScore(key, scores);
		this._storedScores.next(scores);
	}

	public getBestScore(): number {
		return this.getScoreStored('scores').length
			? Math.max(...this.getScoreStored('scores').map((x) => x.score))
			: 0;
	}

	private getLastPlayer(): string {
		return localStorage.getItem('lastPlayer');
	}

	private getScoreStored(key: string): Score[] {
		if (!localStorage.getItem(key))
			localStorage.setItem(key, JSON.stringify([]));

		return JSON.parse(localStorage.getItem(key));
	}

	private setLastPlayer(player: string) {
		localStorage.setItem('lastPlayer', player);
		this._lastPlayer.next(player);
	}

	private saveScore(key: string, scores: Score[]): void {
		const sortedScores = scores.sort((a, b) =>
			a.score > b.score ? -1 : a.score < b.score ? 1 : 0
		);

		localStorage.setItem(key, JSON.stringify(sortedScores));
	}
}

export interface Score {
	id: string;
	player: string;
	score: number;
}
