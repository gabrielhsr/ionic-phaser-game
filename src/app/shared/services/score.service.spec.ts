import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';

describe('StorageService', () => {
	let service: ScoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ScoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
