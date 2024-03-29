import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloorService } from '../../../../services/floor.service';
import { Floor } from '../../../../models/floor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-update-floor',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './UpdateFloor.component.html',
  styleUrl: './UpdateFloor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFloorComponent implements OnInit {
  fg!: FormGroup;
  floor!: Floor
  token!: string;
  state!: any;
  @Input() id = '';

  constructor(private readonly _floorService: FloorService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    effect(() => {
      this._floorService.floors()
      const id = this._route.snapshot.paramMap.get('id');
      if (id) {
        const getFloor = this._floorService.get(Number(id))
        if (getFloor) {
          this.floor = getFloor
          this.fg.patchValue(this.floor)
        }
      }
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      floorNumber: [null, [Validators.required]],
    });
  }

  update() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

    this._floorService.update(Number(this.id), this.fg.value, headers)
      .subscribe(
        {
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Floor updated', life: 6000 });
            this._router.navigate(['/floors']);
          },
          error: err => {
            this._messageService.add({ severity: 'error', summary: 'Invalid', detail: `${err.error}`, life: 6000 });
          }
        }
      )
  }
}
