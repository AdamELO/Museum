import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { 

  state: any
  role!: any
  id!: any

  constructor(private readonly _store: Store) {

    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.role = session.role;
      this.id = session.userId;
    });

  }
}
