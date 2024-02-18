import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Store, select } from '@ngrx/store';
import { Booking } from '../../../models/booking.model';
import { HttpHeaders } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './Bookings.component.html',
  styleUrl: './Bookings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent implements OnInit {

  bookings: Signal<Booking[]>
  state: any
  token!: any
  userId!: any

  constructor(private readonly _bookingService: BookingService, private readonly _store: Store) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
      this.userId = session.userId;
    });
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

    this._bookingService.getAllUsersBookings(Number(this.userId), headers);
    this.bookings = this._bookingService.bookingsUserId;
  }

  ngOnInit(): void {
    // this.bookings = this._bookingService.getAllUsersBookings();
  }

}
