import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-floor-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './FloorDetails.component.html',
  styleUrl: './FloorDetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorDetailsComponent { 
  // recup les expos qui sont à cet étage
}
