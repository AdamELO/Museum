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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImgBlobConverter } from '../../pipes/img.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { Pricing } from '../../models/pricing.model';
import { PricingService } from '../../services/pricing.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { BookingService } from '../../services/booking.service';
import { HttpHeaders } from '@angular/common/http';
import { Booking } from '../../models/booking.model';

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
    ReactiveFormsModule,
    RatingModule,
    RouterLink
  ],
  templateUrl: './ExhibitionDetails.component.html',
  styleUrl: './ExhibitionDetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionDetailsComponent implements OnInit {
  @Input() id = '';

  token!: string;
  nameIdentifier!: string;
  state!: any;

  visible: boolean = false;
  exhibition!: Signal<Exhibition | null>;
  date?: any;
  hourRange: any = [
    { hour: '09-10' },
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
  pricing!: Signal<Pricing | null>;
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


  constructor(
    private readonly _exhibitionService: ExhibitionService,
    private readonly _bookingService: BookingService,
    private readonly _pricingService: PricingService,
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _store: Store,
    private readonly _router: Router
  ) {
    const id = this._route.snapshot.paramMap.get('id');

    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
      this.nameIdentifier = session.userId;
    });

    if (id) {
      this.exhibition = this._exhibitionService.findById(Number(id))
    }

    this.exhibition = this._exhibitionService.exhibition;
    this.pricing = this._pricingService.pricing;
  }

  create() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    if (this.fg.value.adults + this.fg.value.seniors + this.fg.value.children <= 0) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Min 1 person', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    const id = this._route.snapshot.paramMap.get('id');

    const booking: any = {
      start: this.dateFormating(this.fg.value.startdate, true),
      end: this.dateFormating(this.fg.value.startdate, false),
      totalAdults: this.fg.value.adults,
      totalSeniors: this.fg.value.seniors,
      totalChildren: this.fg.value.children,
    }

    this._bookingService.add(Number(id), booking, headers).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'booking added', life: 3000 });
        this._router.navigate(['/dashboard']);
      },
      error: err => {
        this._messageService.add({ severity: 'error', summary: 'Failed', detail: `${err.error}`, life: 3000 });
      }
    })

  }


  dateFormating(date: string, start: boolean) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    
    if (start) {
      const formattedDateString = `${year}-${month}-${day}T${this.fg.value.hours.hour.slice(0, 2)}:00:00.000Z`;
      return formattedDateString;
    }
    else {
      const formattedDateString = `${year}-${month}-${day}T${this.fg.value.hours.hour.slice(3, 5)}:00:00.000Z`;
      return formattedDateString;
    }
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
