import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update-exhibition',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './UpdateExhibition.component.html',
  styleUrl: './UpdateExhibition.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateExhibitionComponent { }
