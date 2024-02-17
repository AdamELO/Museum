import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { ExhibitionService } from '../../../../services/exhibition.service';
import { Exhibition } from '../../../../models/exhibitions.model';

@Component({
  selector: 'app-add-exhibition',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './AddExhibition.component.html',
  styleUrl: './AddExhibition.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExhibitionComponent implements OnInit {

  fg!: FormGroup;
  token!: string;
  state!: any;

  constructor(private readonly _exhibitionService: ExhibitionService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      floorNumber: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      StartDate: [null, [Validators.required]],
      EndDate: [null, [Validators.required]],
      maxPerson: [null, [Validators.required]],
      categories: [null, [Validators.required]],
    });
  }

  create() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'danger', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

    const exhibition: Exhibition = this.fg.value

    this._exhibitionService.add(exhibition, headers).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Exhibition added', life: 3000 });
        this._router.navigate(['/exhibitions']);
      },
      error: err => {
        this._messageService.add({ severity: 'error', summary: 'Failed', detail: `${err}`, life: 3000 });
        console.log(err);
      }
    })
  }
}
