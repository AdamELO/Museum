import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Exhibition } from '../../models/exhibitions.model';

@Component({
  selector: 'app-exhibition-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './ExhibitionCard.component.html',
  styleUrl: './ExhibitionCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionCardComponent {
//recup info de l'exhib
exhibition?: Exhibition
}
