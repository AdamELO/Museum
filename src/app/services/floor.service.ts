import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Floor } from '../models/floor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private _floors: WritableSignal<Floor[]> = signal([]);

  get floors(): Signal<Floor[]> {
    return this._floors.asReadonly();
  }


  private _floor: WritableSignal<Floor|null> = signal(null);
  public get floor(): Signal<Floor|null> {
    return this._floor.asReadonly();
  }

  get(id: number) {
    return this.floors().find(f => f.id === id);
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Floor[]>( environment.Base_URL + 'Floor')
      .subscribe(result => {
        this._floors.set(result);
      });
  }

  remove(id: number, headers: any) {
    this._httpClient.delete(environment.Base_URL + 'Floor/' + id, headers)
      .subscribe(() => {
        this._floors.update(l => l.filter(f => f.id !== id));
      })
  }

  update(id: number, modifiedFloor: Floor, headers: any) {
    const f = this.get(id);
    if (!f) {
      return;
    }
    this._httpClient.put<Floor>(environment.Base_URL + 'Floor/' + id, modifiedFloor, headers)
      .subscribe(result => {
        Object.assign(f, result);
        this._floors.update(l => [...l]);
      })
  }

  add(f: Floor) {
    this._httpClient.post<Floor>(environment.Base_URL + 'Floor', f)
    .subscribe(result => {
    this._floors.update(l => [...l, result]);
    });
    }


}
