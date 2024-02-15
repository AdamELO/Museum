import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Users.component.html',
  styleUrl: './Users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent { }
