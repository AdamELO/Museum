import { Component, Signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FloorService } from './services/floor.service';
import { Floor } from './models/floor.model';
import { CategoryService } from './services/category.service';
import { Category } from './models/category.model';
import { Exhibition } from './models/exhibitions.model';
import { ExhibitionService } from './services/exhibition.service';
import { imgBlobConverter } from './pipes/img.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, imgBlobConverter],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Museum';
  exhibitions: Signal<Exhibition[]>
  isDoorOpen = false;


  constructor(
    private readonly _exhibitionService: ExhibitionService,
  ) {
    this.exhibitions = this._exhibitionService.exhibitions;
    effect(() => {
      console.log(this.exhibitions())
      
    })
  }

  toggleDoor() {
    this.isDoorOpen = !this.isDoorOpen;
  }

  select(floorId: number) {
    this._exhibitionService.findAllByFloorId(floorId);
  }
}
