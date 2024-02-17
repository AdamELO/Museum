import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FloorService } from '../../services/floor.service';
import { Floor } from '../../models/floor.model';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    TooltipModule
  ],
  templateUrl: './Floor.component.html',
  styleUrl: './Floor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FloorComponent {
  floors: Signal<Floor[]>

  constructor(private readonly _floorService: FloorService) {
    this.floors = this._floorService.floors;
  }

}
