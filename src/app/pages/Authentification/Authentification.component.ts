import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Store, select } from '@ngrx/store';
import { sessionStart } from '../../store/session.state';
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

  loginOrRegister: boolean = true
  fg!: FormGroup
  state: any
  username: string

  disabledFields = ['email', 'firstname', 'lastname', 'birthdate']

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _store: Store
  ) {
    this.state = this._store.pipe(select((state: any) => state.session));
    this.username = this.state.actionsObserver._value.username;
  }

  ngOnInit(): void {
    this.fg = this._fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      firstname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      birthdate: [null, [Validators.required]],
    });

    if(this.loginOrRegister) {
      this.disabledFields.forEach(f => this.fg.get(f)?.disable())
    } else {
      this.disabledFields.forEach(f => this.fg.get(f)?.enable())
    }
  }

  login() {
    if (this.fg.invalid) {
      return;
    }

    this._authService.login({username: this.fg.value.username, password: this.fg.value.password}).subscribe({
      next: data => {
        this._router.navigate(['/dashboard']);
        this._store.dispatch(sessionStart({
          token: data.token,
          username: (jwtDecode(data.token) as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        }))
      },
      error: err => {
        alert('impossible de se connecter')
        console.log(err.message);
      },
      // complete: () => {
      //   // qd l'observable a fini d'emettre
      // }
    })
  }

  register() {
    if (this.fg.invalid) {
      return;
    }

    this._authService.register(this.fg.value).subscribe({
      next: data => {
        this.login();
        console.log('ok');
      }, 
      error: err => {
        console.log('erreur', err.message);
      }
    })
  } 
  
  loginOrRegisterForm() {
    this.loginOrRegister = !this.loginOrRegister
    this.fg.reset();
  }

}
