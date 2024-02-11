import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-exhibition-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ExhibitionCard.component.html',
  styleUrl: './ExhibitionCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionCardComponent { }
