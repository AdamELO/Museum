import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Pricing } from '../../../models/pricing.model';
import { PricingService } from '../../../services/pricing.service';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './Pricing.component.html',
  styleUrl: './Pricing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent implements OnInit {
  fg!: FormGroup;
  pricing!: Signal<Pricing|null>;
  token!: string;
  state!: any;
  price!: Pricing|null;

  constructor(private readonly _pricingService: PricingService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    this.pricing = this._pricingService.pricing;
    effect(() => {
      this.pricing = this._pricingService.pricing;
      this.price = this.pricing();
      if (this.price != null) {
        this.fg.patchValue(this.price);
      }
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      adultPrice: [null, [Validators.required, Validators.min(1)]],
      childPrice: [null, [Validators.required, Validators.min(1)]],
      seniorPrice: [null, [Validators.required, Validators.min(1)]],
      groupReduction: [null, [Validators.required, Validators.min(5), Validators.max(95)]],
      groupMinNumber: [null, [Validators.required, Validators.min(2)]],
    });
  }

  update() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

    this._pricingService.update(this.fg.value, headers)
      .subscribe(
        {
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Pricing updated', life: 6000 });
          },
          error: err => {
            this._messageService.add({ severity: 'error', summary: 'Invalid', detail: `${err}`, life: 6000 });
          }
        }
      )
  }
}
