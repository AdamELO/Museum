import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './UpdateUser.component.html',
  styleUrl: './UpdateUser.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent { }
