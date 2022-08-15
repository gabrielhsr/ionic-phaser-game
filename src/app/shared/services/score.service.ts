import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
	providedIn: 'root',
})
export class ScoreService {
	private storage: Storage | null = null;

	constructor(private ionicStorage: Storage) {
		this.init();
	}

	async init() {
		const storage = await this.ionicStorage.create();
		this.storage = storage;
	}

	public set(player: string, score: number) {
		this.storage?.set('player', player);
		this.storage?.set('score', score);
	}

	public async get(key: string) {
		return await this.storage.get(key);
	}
}
