import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, effect } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterLink,
    SelectButtonModule,
    FormsModule,
    ProgressSpinnerModule
  ],
  templateUrl: './Users.component.html',
  styleUrl: './Users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit{

  users: Signal<User[]>
  usersFiltered!: User[]
  state: any
  token!: any
  stateOptions: any[] = [{label: 'Active', value: 'active'}, {label: 'Disabled', value: 'disable'}];
  value: string = 'active';
  disabledFilter: boolean = true;

  constructor(private readonly _userService: UserService, private readonly _store: Store, private readonly _confirmationService: ConfirmationService, private readonly _messageService: MessageService) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._userService.getAll(headers);
    this.users = this._userService.users;

    this.value = "active"
    effect(( )=>{
      // this.isDeletedSort()
    })
    if (this.value == "active") {
      console.log(this.value);
      this.usersFiltered = this._userService.users().filter(u => !u.isDeleted)
    }else{
      this.usersFiltered = this._userService.users().filter(u => u.isDeleted)
    }
  }

  ngOnInit(): void {
    this.usersFiltered = this._userService.users().filter(u => !u.isDeleted)
    this.isDeletedSort()
  }

  remove(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._userService.remove(id, headers)
    // this.usersFiltered = this._userService.users().filter(u => u.id ! == id)
    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User disabled', life: 3000 });
  }

  active(id: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this._userService.activate(id, headers)
    // this.usersFiltered = this._userService.users().filter(u => u.id ! == id)
    this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User activated', life: 3000 });
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
        this._messageService.add({ severity: 'warn', summary: 'Canceled', detail: 'Deletion canceled', life: 3000 });
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

  isDeletedSort(){
    if (this.value == "active") {
      this._userService.users().filter(u => !u.isDeleted)
      this.usersFiltered = this._userService.users().filter(u => !u.isDeleted)
    }else{
      this._userService.users().filter(u => u.isDeleted)
      this.usersFiltered = this._userService.users().filter(u => u.isDeleted)
    }
    
  }

}
