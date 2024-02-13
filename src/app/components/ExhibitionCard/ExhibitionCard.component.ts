import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Exhibition } from '../../models/exhibitions.model';
import { ImgBlobConverter } from '../../pipes/img.pipe';

@Component({
  selector: 'app-exhibition-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ImgBlobConverter
  ],
  templateUrl: './ExhibitionCard.component.html',
  styleUrl: './ExhibitionCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionCardComponent {

@Input()
exhibition!:  Exhibition
}
