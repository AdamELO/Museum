import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Bookings.component.html',
  styleUrl: './Bookings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent { }
