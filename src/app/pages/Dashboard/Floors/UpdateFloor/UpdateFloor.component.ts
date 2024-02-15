import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloorService } from '../../../../services/floor.service';
import { Floor } from '../../../../models/floor.model';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-update-floor',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './UpdateFloor.component.html',
  styleUrl: './UpdateFloor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFloorComponent implements OnInit {
  fg!: FormGroup;
  floor!: Signal<Floor | null>
  token!: string;
  state!: any;
  @Input() id = ''

  constructor(private readonly _floorService: FloorService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store : Store) {
    this.floor = this._floorService.floor;
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    
    effect(()=>{
      console.log(this.floor(), this.id);
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [this.floor()?.id, [Validators.required, Validators.maxLength(50)]],
      floorNumber: [this.floor()?.floorNumber, [Validators.required]],
    });
  }

  update() {
    console.log('test');
    console.log(this.fg.value.name);
    
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'danger', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }
    console.log('test2');

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    
    const id = this._route.snapshot.paramMap.get('id');
    this._floorService.update(Number(id), this.fg.value, { headers }).subscribe({
      next: () => {
        // this._router.navigate(['/floors']);
      this._messageService.add({ severity: 'Success', summary: 'Confirmed', detail: 'Floor updated', life: 3000 });

      },
      error: () => {
        this._messageService.add({ severity: 'danger', summary: 'Invalid', detail: 'error', life: 3000 });
      }
    })

    // this._messageService.add({ severity: 'Success', summary: 'Confirmed', detail: 'Floor updated', life: 3000 });
  }
}
