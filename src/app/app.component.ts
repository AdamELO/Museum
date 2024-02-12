import { Component, Signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Exhibition } from './models/exhibitions.model';
import { ExhibitionService } from './services/exhibition.service';
import { NavComponent } from './components/Nav/Nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Museum';
  exhibitions: Signal<Exhibition[]>

  constructor(
    private readonly _exhibitionService: ExhibitionService,
  ) {
    this.exhibitions = this._exhibitionService.exhibitions;
    // effect(() => {
    //   console.log(this.exhibitions())
      
    // })
  }
}
