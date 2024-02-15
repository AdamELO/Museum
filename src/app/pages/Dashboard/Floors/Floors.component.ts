import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-floors',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: './Floors.component.html',
  styleUrl: './Floors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorsComponent { }
