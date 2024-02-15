import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Signal, effect } from '@angular/core';
import { ReviewComponent } from '../Review/Review.component';
import { CardModule } from 'primeng/card';
import { Exhibition } from '../../models/exhibitions.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ExhibitionService } from '../../services/exhibition.service';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute } from '@angular/router';
import { ImgBlobConverter } from '../../pipes/img.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { Pricing } from '../../models/pricing.model';
import { PricingService } from '../../services/pricing.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-exhibition-details',
  standalone: true,
  imports: [
    CommonModule,
    ReviewComponent,
    CardModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    ImgBlobConverter,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ExhibitionDetails.component.html',
  styleUrl: './ExhibitionDetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionDetailsComponent implements OnInit {
  @Input() id = '';
  
  visible: boolean = false;
  exhibition!: Signal<Exhibition|null>;
  date?: any;
  hourRange: any = [
    { hour: '9-10' },
    { hour: '10-11' },
    { hour: '11-12' },
    { hour: '12-13' },
    { hour: '13-14' },
    { hour: '14-15' },
    { hour: '15-16' },
    { hour: '16-17' },
    { hour: '17-18' },
    { hour: '18-19' },
    { hour: '19-20' },
    { hour: '20-21' },
  ];
  fg!: FormGroup;
  pricing!: Signal<Pricing|null>;
  adultNb: number = 0;
  seniorNb: number = 0;
  childNb: number = 0;
  totalPrice: number = 0;

  showDialog() {
      this.visible = true;
  }

  ngOnInit() {
    this.fg = this._fb.group({
      adults: [null, [Validators.required]],
      seniors: [null, [Validators.required]],
      children: [null, [Validators.required]],
      startdate: [null, [Validators.required]],
      hours: [null, [Validators.required]],
    });

    this.calculateTotalPrice();
}


constructor(private readonly _exhibitionService: ExhibitionService, private readonly _pricingService: PricingService ,private readonly _route: ActivatedRoute, private readonly _fb: FormBuilder) {
  const id = this._route.snapshot.paramMap.get('id');
  if (id) {
    this.exhibition = this._exhibitionService.findById(Number(id))
  }

  this.exhibition = this._exhibitionService.exhibition;
  this.pricing = this._pricingService.pricing;
}

bookingCheck(){
  console.log('test');
}


calculateTotalPrice() {
  const adultPrice = this.pricing()?.adultPrice;
  const childPrice = this.pricing()?.childPrice;
  const seniorPrice = this.pricing()?.seniorPrice;
  const groupReduction = this.pricing()?.groupReduction;
  const groupMinNumber = this.pricing()?.groupMinNumber;

  if (adultPrice && seniorPrice && childPrice && groupMinNumber && groupReduction) {
     this.totalPrice = (this.adultNb * adultPrice) + (this.childNb * childPrice) + (this.seniorNb * seniorPrice);
    if ((this.adultNb + this.childNb + this.seniorNb) >= groupMinNumber) {
      return (this.totalPrice - (this.totalPrice * (groupReduction / 100))).toFixed(2);
    }
  }
  return this.totalPrice.toFixed(2);
}

}
