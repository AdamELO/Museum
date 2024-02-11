import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private _reviews: WritableSignal<Review[]> = signal([]);

  get reviews(): Signal<Review[]> {
    return this._reviews.asReadonly();
  }

  constructor(private readonly httpClient: HttpClient) {
    this.httpClient.get<Review[]>('http://localhost:5190/api/Review')
    .subscribe(result => {
      this._reviews.set(result);
    });
  }

}
