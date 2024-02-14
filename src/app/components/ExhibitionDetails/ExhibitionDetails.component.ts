import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal } from '@angular/core';
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
    InputNumberModule
    
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
  hourRange: any = [];
  pricing!: Signal<Pricing|null>

  showDialog() {
      this.visible = true;
  }

  ngOnInit() {
    this.hourRange = [
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
}


// recup l'exposition et ses details et btn reservation + recup pricing

constructor(private readonly _exhibitionService: ExhibitionService, private readonly _pricingService: PricingService ,private readonly _route: ActivatedRoute) {
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

PriceCalculation(){
  console.log(this.pricing);
  
}

}
