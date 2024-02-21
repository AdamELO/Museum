import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  templateUrl: './UpdateUser.component.html',
  styleUrl: './UpdateUser.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {

  fg!: FormGroup;
  user!: User
  token!: string;
  role!: string;
  nameIdentifier!: string;
  state!: any;
  @Input() id = '';

  constructor(private readonly _userService: UserService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
      this.nameIdentifier = session.userId;
      this.role = session.role;
    });
    effect(() => {
      this._userService.users()
      const id = this._route.snapshot.paramMap.get('id');
      if (id) {
        const getFloor = this._userService.get(Number(id))
        if (getFloor) {
          this.user = getFloor
          this.fg.patchValue(this.user)
        }
      }
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      username: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    });
  }

  update() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    
    if (Number(this.nameIdentifier) != Number(this.id)) {
      if ((this.role != "Admin" )) {
        this._messageService.add({ severity: 'error', summary: 'Who are you?', detail: 'You are not supposed to update this user!!!', life: 3000 });
        return;
      }
    }

    this._userService.update(Number(this.id), this.fg.value, headers)
      .subscribe(
        {
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User updated', life: 6000 });
            this._router.navigate(['/dashboard']);
          },
          error: err => {
            this._messageService.add({ severity: 'error', summary: 'Invalid', detail: `${err.error}`, life: 6000 });
          }
        }
      )
  }

}
