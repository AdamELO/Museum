import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Floor } from '../models/floor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environment';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private _floors: WritableSignal<Floor[]> = signal([]);
  get floors(): Signal<Floor[]> {
    return this._floors.asReadonly();
  }


  private _floor: WritableSignal<Floor | null> = signal(null);
  public get floor(): Signal<Floor | null> {
    return this._floor.asReadonly();
  }

  get(id: number) {
    return this.floors().find(f => f.id === id);
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Floor[]>(environment.Base_URL + 'Floor')
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

  update(id: number, modifiedFloor: Floor, headers: any): Observable<Floor> {
    const f = this.get(id);
    if (!f) {
      return throwError(() => of());
    }
    return this._httpClient.put<Floor>(environment.Base_URL + 'Floor/' + id, modifiedFloor, { headers })
      .pipe(tap(result => {
        Object.assign(f, modifiedFloor);
        this._floors.update(l => [...l]);
      }))

  }

  add(f: Floor, headers: any) {
    return this._httpClient.post<Floor>(environment.Base_URL + 'Floor', f, { headers })
      .pipe(tap(result => {
        this._floors.update(l => [...l, result]);
      }))
  }
}
