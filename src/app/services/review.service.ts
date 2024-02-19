import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review.model';
import { environment } from '../../environements/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private _reviewsWithExhibId: WritableSignal<Review[]> = signal([]);
  public get reviewsWithExhibId(): Signal<Review[]> {
    return this._reviewsWithExhibId.asReadonly();
  }

  constructor(private readonly _httpClient: HttpClient) { }

  public findAllByExhibId(exhibitionId: number): any {
    this._httpClient.get<Review[]>(environment.Base_URL + 'Review/exhibitionReviews' + exhibitionId)
      .subscribe(result => {
        this._reviewsWithExhibId.set(result);
      })
  }

  add(exhibitionId: number,r: {text: string, rating: number}, headers: any) {
    return this._httpClient.post<Review>(environment.Base_URL + 'Review/' + exhibitionId, r, { headers })
      .pipe(tap(result => {
        this._reviewsWithExhibId.update(l => [...l, result]);
      }))
  }

}
