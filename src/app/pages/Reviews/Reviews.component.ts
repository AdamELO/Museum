import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal, effect, input } from '@angular/core';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ConfirmPopupModule,
    ReactiveFormsModule
  ],
  templateUrl: './Reviews.component.html',
  styleUrl: './Reviews.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent implements OnInit {
  @Input() id: string = '';
  nameIdentifier!: string;
  state!: any;
  token!: any;
  visible: boolean = false;
  reviews!: Signal<Review[]>;
  fg!: FormGroup;

  constructor(private readonly _reviewService: ReviewService, private readonly _store: Store, private readonly _fb: FormBuilder, private readonly _messageService: MessageService, private readonly _route: ActivatedRoute) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    const id = this._route.snapshot.paramMap.get('id');
    this.reviews = _reviewService.findAllByExhibId(Number(id))

    this.reviews = this._reviewService.reviewsWithExhibId;
    effect(() => {
      // console.log(this.reviews());
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      text: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  showDialog() {
    this.visible = true;
  }

  create() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    
    if (!this.token) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'you must be logged in', life: 3000 });
      return;
    }

    const id = this._route.snapshot.paramMap.get('id');

    this._reviewService.add(Number(id), this.fg.value, headers).subscribe({
      next: () => {
        this.visible = false;
        this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Review added', life: 3000 });
      },
      error: err => {
        this._messageService.add({ severity: 'error', summary: 'Failed', detail: `${err.error}`, life: 3000 });
      }
    })
  }
}

