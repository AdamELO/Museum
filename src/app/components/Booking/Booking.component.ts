import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Booking.component.html',
  styleUrl: './Booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent { }
