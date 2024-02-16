import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Pricing.component.html',
  styleUrl: './Pricing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent { }
