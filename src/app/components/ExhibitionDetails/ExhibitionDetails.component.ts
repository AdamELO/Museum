import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReviewComponent } from '../Review/Review.component';
import { CardModule } from 'primeng/card';
import { Exhibition } from '../../models/exhibitions.model';

@Component({
  selector: 'app-exhibition-details',
  standalone: true,
  imports: [
    CommonModule,
    ReviewComponent,
    CardModule
  ],
  templateUrl: './ExhibitionDetails.component.html',
  styleUrl: './ExhibitionDetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionDetailsComponent {
// recup l'exposition et ses details et btn reservation

exhibition?: Exhibition
}
