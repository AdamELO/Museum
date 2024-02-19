import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './AddCategory.component.html',
  styleUrl: './AddCategory.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent implements OnInit {
  fg!: FormGroup;
  token!: string;
  state!: any;

  constructor(private readonly _categoryService: CategoryService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
    });
  }

  create() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    
    const category: Category =  this.fg.value
  
    this._categoryService.add(category, headers ).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Category added', life: 3000 });
        this._router.navigate(['/categories']);
      },
      error: err => {
        this._messageService.add({ severity: 'error', summary: 'Failed', detail: `${err}`, life: 3000 });
      }
    })
  }

}
