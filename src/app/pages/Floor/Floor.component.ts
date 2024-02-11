import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Floor.component.html',
  styleUrl: './Floor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorComponent { }
