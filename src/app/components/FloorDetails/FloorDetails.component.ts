import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, effect } from '@angular/core';
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
  // recup les expos qui sont à cet étage
  exhibitionsWithFloorId?: Exhibition[]

  constructor(private readonly _exhibitionService: ExhibitionService, private readonly _route : ActivatedRoute) {
    // effect(() => {
    //   console.log();
      
    // })
    
  }
  @Input() id = '';

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      console.log(this.id);
      this.exhibitionsWithFloorId = this._exhibitionService.findAllByFloorId(Number(id))
    }
  }


}
