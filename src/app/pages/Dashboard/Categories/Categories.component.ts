import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Categories.component.html',
  styleUrl: './Categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent { }
