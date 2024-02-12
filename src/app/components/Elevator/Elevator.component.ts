import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elevator',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Elevator.component.html',
  styleUrl: './Elevator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElevatorComponent {
  isDoorOpen = false;

  constructor(private readonly _router: Router) {

  }

  toggleDoor() {
    this.isDoorOpen = !this.isDoorOpen;
  }
  goInside(){
    this._router.navigate(['/floor']);
  }

}
