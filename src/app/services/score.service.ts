/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {
    private _score = 0;
    private _scoreSubject = new BehaviorSubject<number>(0);

    public get score(): Observable<number> {
        return this._scoreSubject.asObservable();
    }

    public increase(value: number) {
        this._score += value;
        this._scoreSubject.next(this._score);
    }
}
