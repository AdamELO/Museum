import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-floor',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './AddFloor.component.html',
  styleUrl: './AddFloor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFloorComponent { }
