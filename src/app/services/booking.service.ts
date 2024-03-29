import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Booking } from '../models/booking.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookingsUserId: WritableSignal<Booking[]> = signal([]);
  public get bookingsUserId(): Signal<Booking[]> {
    return this._bookingsUserId.asReadonly();
  }

  constructor(private readonly _httpClient: HttpClient) {}

  getAllUsersBookings(id: number, headers: any){
    this._httpClient.get<Booking[]>(environment.Base_URL + 'Booking/AllUsersBookings'+ id, {headers})
    .subscribe(result => {
      this._bookingsUserId.set(result);
    });
  }

  add(exhibitionId: number, e: {start: Date, date: Date, totalAdults: number, totalSeniors: number, totalChildren: number}, headers: any) {
    return this._httpClient.post<Booking>(environment.Base_URL + 'Booking/' + exhibitionId, e, { headers })
      // .pipe(tap(result => {
      //   this._bookingsUserId.update(l => [...l, result]);
      // }))
  }

}
