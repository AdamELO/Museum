import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-exhibition-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ExhibitionDetails.component.html',
  styleUrl: './ExhibitionDetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionDetailsComponent { }
