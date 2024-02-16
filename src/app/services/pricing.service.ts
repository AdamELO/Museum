import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Pricing } from '../models/pricing.model';
import { environment } from '../../environements/environment';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  private _pricing: WritableSignal<Pricing | null> = signal(null);

  get pricing(): Signal<Pricing|null> {
    return this._pricing.asReadonly();
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Pricing>(environment.Base_URL + 'Pricing')
    .subscribe(result => {
      this._pricing.set(result);
    });
  }

  update(modifiedPrice: Pricing, headers: any): Observable<Pricing> {
    return this._httpClient.put<Pricing>(environment.Base_URL + 'Pricing', modifiedPrice, { headers })
      .pipe(tap(result => {
        this._pricing.set(result);
      }))
  }


}
