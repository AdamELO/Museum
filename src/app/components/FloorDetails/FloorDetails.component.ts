import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExhibitionCardComponent } from '../ExhibitionCard/ExhibitionCard.component';
import { Exhibition } from '../../models/exhibitions.model';

@Component({
  selector: 'app-floor-details',
  standalone: true,
  imports: [
    CommonModule,
    ExhibitionCardComponent
  ],
  templateUrl: './FloorDetails.component.html',
  styleUrl: './FloorDetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorDetailsComponent { 
  // recup les expos qui sont à cet étage
  floorExhibitions: Exhibition[] = []


}
