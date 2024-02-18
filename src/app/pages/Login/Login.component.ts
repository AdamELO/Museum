import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { sessionStart } from '../../store/session.state';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    CardModule,
    PasswordModule,
    InputTextModule
  ],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  fg!: FormGroup

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _store: Store,
    private readonly _messageService : MessageService
  ) {}

  
  ngOnInit(): void {
    this.fg = this._fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    this._authService.login({username: this.fg.value.username, password: this.fg.value.password}).subscribe({
      next: data => {
        this._router.navigate(['/dashboard']);
        this._store.dispatch(sessionStart({
          token: data.token,
          username: (jwtDecode(data.token) as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          userId: (jwtDecode(data.token) as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
          role: (jwtDecode(data.token) as any)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        }))
      },
      error: err => {
        this._messageService.add({ severity: 'error', summary: 'Invalid', detail: `${err.message}`, life: 6000 });
      }
    })
  }

}
