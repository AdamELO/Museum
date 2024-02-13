import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './Register.component.html',
  styleUrl: './Register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  fg!: FormGroup

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    this.fg = this._fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      firstname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      birthdate: [null, [Validators.required]],
    });
  }
  
  register() {
    if (this.fg.invalid) {
      return;
    }

    this._authService.register(this.fg.value).subscribe({
      next: data => {
        this._router.navigate(['/login']);
      },
      error: err => {
        console.log('erreur', err.message);
      }
    })
  }
}