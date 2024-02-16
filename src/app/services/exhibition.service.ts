import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exhibition } from '../models/exhibitions.model';
import { environment } from '../../environements/environment';


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

}
