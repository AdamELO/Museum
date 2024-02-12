import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { sessionStart, sessionStop } from '../../store/session.state';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './Authentification.component.html',
  styleUrl: './Authentification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthentificationComponent implements OnInit {

  fg!: FormGroup

  isLoggedIn$ = this._store.pipe(select((state: any) => state.session));
  // session!: { username: string | null; token: string | null };

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _store: Store
  ) { }

  ngOnInit(): void {
    this.fg = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if(this.fg.invalid) {
      return;
    }

    this._authService.login(this.fg.value).subscribe({
      next: data => {
        this._router.navigate(['/dashboard']);
        this._store.dispatch(sessionStart({
          token: data.token,
          username: (jwtDecode(data.token) as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        }))
      },
      error: err => {
        // en cas d'erreur
        alert('impossible de se connecter')
      },
      // complete: () => {
      //   // qd l'observable a fini d'emettre
      // }
    })
  }

}
