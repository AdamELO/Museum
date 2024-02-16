import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { Floor } from '../../../models/floor.model';
import { FloorService } from '../../../services/floor.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { SortByIdFloorPipe } from '../../../pipes/sort.pipe';


@Component({
  selector: 'app-floors',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmPopupModule,
    RouterLink,
    SortByIdFloorPipe
  ],
  templateUrl: './Floors.component.html',
  styleUrl: './Floors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorsComponent implements OnInit {
  floors: Signal<Floor[]>
  state: any
  token!: any

  constructor(private readonly _floorService: FloorService, private readonly _store: Store, private readonly _confirmationService: ConfirmationService, private readonly _messageService: MessageService) {
    this.floors = this._floorService.floors;
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
  }

  ngOnInit(): void {
    this.floors = this._floorService.floors;
  }

  delete(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._floorService.remove(id, { headers })

    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Floor deleted', life: 3000 });

  }

  deleteConfirmation(event: Event, id: number) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this floor?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.delete(id)
      },
      reject: () => {
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Deletion rejected', life: 3000 });
      }
    });
  }
}
