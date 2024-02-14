import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Pricing } from '../models/pricing.model';

const BASE_URL = 'http://localhost:5190/api';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  private _pricing: WritableSignal<Pricing | null> = signal(null);

  get pricing(): Signal<Pricing|null> {
    return this._pricing.asReadonly();
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Pricing>(BASE_URL + '/Pricing')
    .subscribe(result => {
      this._pricing.set(result);
    });
  }

}
