import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Floor } from '../models/floor.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private _floors: WritableSignal<Floor[]> = signal([]);

  get floors(): Signal<Floor[]> {
    return this._floors.asReadonly();
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Floor[]>('http://localhost:5190/api/Floor')
    .subscribe(result => {
      this._floors.set(result);
    });
  }

}
