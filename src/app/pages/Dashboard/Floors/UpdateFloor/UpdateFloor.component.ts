import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update-floor',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './UpdateFloor.component.html',
  styleUrl: './UpdateFloor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFloorComponent { }
