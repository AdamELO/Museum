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
  providers: [MessageService],
  templateUrl: './UpdateFloor.component.html',
  styleUrl: './UpdateFloor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFloorComponent implements OnInit {
  fg!: FormGroup;
  // floor!: Signal<Floor | null>
  floor?: Floor
  token!: string;
  state!: any;
  @Input() id = ''

  constructor(private readonly _floorService: FloorService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store : Store) {
    // this.floor = this._floorService.floor;
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    this.floor = this._floorService.get(Number(this.id))
    effect(()=>{
      console.log(this.floor, this.id);
      
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [this.floor?.id, [Validators.required, Validators.maxLength(50)]],
      floorNumber: [this.floor?.floorNumber, [Validators.required]],
    });
  }

  update() {
    console.log('test');
    
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'Warning', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }
    console.log('test2');

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    
    const id = this._route.snapshot.paramMap.get('id');
    this._floorService.update(Number(id), this.fg.value, { headers })

    this._messageService.add({ severity: 'Success', summary: 'Confirmed', detail: 'Floor updated', life: 3000 });
  }
}
