import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    CalendarModule,
    PasswordModule
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
    private readonly _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.fg = this._fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      email: [null, [Validators.required, Validators.email]],
      firstname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      birthdate: [null, [Validators.required]],
    });
  }

  register() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Incomplete form', life: 3000 });
      return;
    }
    
    const inputDate = new Date(this.fg.value.birthdate);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;

    this.fg.value.birthdate = formattedDateString

    this._authService.register(this.fg.value).subscribe({
      next: data => {
        this._messageService.add({ severity: 'success', summary: 'Registered', detail: 'succesfully registered, mail sent', life: 3000 });
        this._router.navigate(['/login']);
      },
      error: err => {
        console.log('erreur', err.message);
      }
    })
  }
}