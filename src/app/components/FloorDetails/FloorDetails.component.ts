import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, effect, input } from '@angular/core';
import { ExhibitionCardComponent } from '../ExhibitionCard/ExhibitionCard.component';
import { Exhibition } from '../../models/exhibitions.model';
import { ExhibitionService } from '../../services/exhibition.service';
import { ActivatedRoute } from '@angular/router';

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

  @Input() floorNumber = '';

  exhibitions!: Signal<Exhibition[]>
  exhibition!: any;

  constructor(private readonly _exhibitionService: ExhibitionService, private readonly _route : ActivatedRoute) {

    const floorNumber = this._route.snapshot.paramMap.get('floorNumber');
    if (floorNumber) {
      this.exhibitions = this._exhibitionService.findAllByFloorNumber(Number(floorNumber))
    }

    this.exhibitions = this._exhibitionService.exhibitionsWithFloorId;
  }

}
