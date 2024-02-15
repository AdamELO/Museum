import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './MyBooking.component.html',
  styleUrl: './MyBooking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingComponent { }
