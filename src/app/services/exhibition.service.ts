import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exhibition } from '../models/exhibitions.model';
import { map } from 'rxjs';

const BASE_URL = 'http://localhost:5190/api';

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

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Exhibition[]>('http://localhost:5190/api/Exhibition')
    .subscribe(result => {
      this._exhibitions.set(result);
    });
    // this.httpClient.get<Exhibition[]>(`http://localhost:5190/api/Exhibition/GetFloorExhibitions${floorId}`)
    // .subscribe(result => {
    //   this._exhibitionsWithFloorId.set(result);
    // });
  }

  findAllByFloorId(floorId: number) : any {
    this._httpClient.get<Exhibition[]>(BASE_URL + '/Exhibition/GetFloorExhibitions' + floorId)
        .subscribe(result => {
          this._exhibitionsWithFloorId.set(result);
        })
}

}
