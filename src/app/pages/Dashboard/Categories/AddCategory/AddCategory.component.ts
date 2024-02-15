import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './AddCategory.component.html',
  styleUrl: './AddCategory.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent { }
