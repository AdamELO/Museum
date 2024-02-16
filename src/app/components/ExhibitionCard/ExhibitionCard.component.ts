import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Exhibition } from '../../models/exhibitions.model';
import { ImgBlobConverter } from '../../pipes/img.pipe';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-exhibition-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ImgBlobConverter,
    ButtonModule,
    RouterLink,
    FormsModule,
    RatingModule
  ],
  templateUrl: './ExhibitionCard.component.html',
  styleUrl: './ExhibitionCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionCardComponent {

@Input()
exhibition!:  Exhibition
}
