import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Review } from '../../models/review.model';

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
export class ReviewComponent { 
  @Input()
  review!: Review


}
