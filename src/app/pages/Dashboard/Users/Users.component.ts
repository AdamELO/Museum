import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './Users.component.html',
  styleUrl: './Users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {

  users: Signal<User[]>
  state: any
  token!: any

  constructor(private readonly _userService: UserService, private readonly _store: Store, private readonly _confirmationService: ConfirmationService, private readonly _messageService: MessageService) {
    this.users = this._userService.users;
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
  }

  ngOnInit(): void {
    this.users = this._userService.users;
  }

  remove(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._userService.remove(id, { headers })
    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User disabled', life: 3000 });
  }

  active(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._userService.activate(id, { headers })
    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User disabled', life: 3000 });
  }



  deleteConfirmation(event: Event, id: number) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to disable this user?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.remove(id)
      },
      reject: () => {
        this._messageService.add({ severity: 'error', summary: 'Canceled', detail: 'Deletion canceled', life: 3000 });
      }
    });
  }

  activateConfirmation(event: Event, id: number) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to activate this user?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.active(id)
      },
      reject: () => {
        this._messageService.add({ severity: 'warn', summary: 'Canceled', detail: 'Activation canceled', life: 3000 });
      }
    });
  }


}
