import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root',
})
export class ScoreService {
	constructor() {}

	public save(player: string, score: number) {
		const data = { player, score };

		if (localStorage.length >= 5) {
			const storedScores = { ...localStorage };
			let scores = [];

			for (const key in storedScores) {
				if (Object.prototype.hasOwnProperty.call(storedScores, key)) {
					const element = JSON.parse(storedScores[key]);

					scores.push(element);
				}
			}

			scores = scores
				.sort((a, b) =>
					a.score > b.score ? -1 : a.score < b.score ? 1 : 0
				)
				.slice(0, 5);

			console.log(scores);
		}

		localStorage.setItem(uuid(), JSON.stringify(data));
	}
}
