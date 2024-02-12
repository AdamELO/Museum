import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Review.component.html',
  styleUrl: './Review.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent { }
