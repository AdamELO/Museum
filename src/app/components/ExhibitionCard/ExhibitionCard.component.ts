import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ReviewComponent } from '../Review/Review.component';

@Component({
  selector: 'app-exhibition-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ReviewComponent
  ],
  templateUrl: './ExhibitionCard.component.html',
  styleUrl: './ExhibitionCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionCardComponent {
// recup l'exposition

}
