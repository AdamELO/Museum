import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './Authentification.component.html',
  styleUrl: './Authentification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthentificationComponent {

}
