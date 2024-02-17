import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, effect } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { Exhibition } from '../../../models/exhibitions.model';
import { ExhibitionService } from '../../../services/exhibition.service';
import { ImgBlobConverter } from '../../../pipes/img.pipe';

@Component({
  selector: 'app-exhibitions',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterLink,
    ImgBlobConverter
  ],
  templateUrl: './Exhibitions.component.html',
  styleUrl: './Exhibitions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionsComponent {

  exhibitions: Signal<Exhibition[]>
  state: any
  token!: any

  constructor(private readonly _exhibitionService: ExhibitionService, private readonly _store: Store, private readonly _confirmationService: ConfirmationService, private readonly _messageService: MessageService) {
    this.exhibitions = this._exhibitionService.exhibitions;
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    effect(() =>{
      console.log(this.exhibitions());
    })
  }

  ngOnInit(): void {
    this.exhibitions = this._exhibitionService.exhibitions;
  }

  delete(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._exhibitionService.remove(id, { headers })

    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Exhibition deleted', life: 3000 });

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
