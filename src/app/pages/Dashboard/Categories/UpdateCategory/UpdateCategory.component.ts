import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './UpdateCategory.component.html',
  styleUrl: './UpdateCategory.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCategoryComponent { }
