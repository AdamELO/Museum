import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exhibition } from '../models/exhibitions.model';
import { environment } from '../../environements/environment';
import { Observable, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ExhibitionService {

  private _exhibitions: WritableSignal<Exhibition[]> = signal([]);
  get exhibitions(): Signal<Exhibition[]> {
    return this._exhibitions.asReadonly();
  }

  private _exhibitionsWithFloorId: WritableSignal<Exhibition[]> = signal([]);
  public get exhibitionsWithFloorId(): Signal<Exhibition[]> {
    return this._exhibitionsWithFloorId.asReadonly();
  }

  private _exhibition: WritableSignal<Exhibition|null> = signal(null);
  public get exhibition(): Signal<Exhibition|null> {
    return this._exhibition.asReadonly();
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Exhibition[]>(environment.Base_URL + 'Exhibition')
      .subscribe(result => {
        this._exhibitions.set(result);
      });
  }

  public findAllByFloorNumber(floorId: number): any {
    this._httpClient.get<Exhibition[]>(environment.Base_URL + 'Exhibition/GetFloorExhibitions' + floorId)
      .subscribe(result => {
        this._exhibitionsWithFloorId.set(result);
      })
  }

  public findById(exhibitionId: number): any {
    this._httpClient.get<Exhibition>(environment.Base_URL + 'Exhibition/' + exhibitionId)
      .subscribe(result => {
        this._exhibition.set(result);
      })
  }


  remove(id: number, headers: any) {
    this._httpClient.patch(environment.Base_URL + 'Exhibition/' + id, id, headers)
      .subscribe(() => {
        this._exhibitions.update(l => l.filter(e => e.id !== id));
      })
  }

  update(id: number, modifiedExhibition: Exhibition, headers: any): Observable<Exhibition> {
    const e = this.findById(id);
    if (!e) {
      return throwError(() => of());
    }
    return this._httpClient.put<Exhibition>(environment.Base_URL + 'Exhibition/' + id, modifiedExhibition, { headers })
      .pipe(tap(result => {
        Object.assign(e, modifiedExhibition);
        this._exhibitions.update(l => [...l]);
      }))

  }

  add(e: Exhibition, headers: any) {
    return this._httpClient.post<Exhibition>(environment.Base_URL + 'Exhibition', e, { headers })
      .pipe(tap(result => {
        this._exhibitions.update(l => [...l, result]);
      }))
  }


}
