import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './Categories.component.html',
  styleUrl: './Categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent { 
  categories: Signal<Category[]>
  state: any
  token!: any

  constructor(private readonly _categoryService: CategoryService, private readonly _store: Store, private readonly _confirmationService: ConfirmationService, private readonly _messageService: MessageService) {
    this.categories = this._categoryService.categories;
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
  }

  delete(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._categoryService.remove(id, { headers })

    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'category deleted', life: 3000 });
  }

  deleteConfirmation(event: Event, id: number) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this category?',
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
