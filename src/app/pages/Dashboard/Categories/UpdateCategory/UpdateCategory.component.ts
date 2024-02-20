import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: './UpdateCategory.component.html',
  styleUrl: './UpdateCategory.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCategoryComponent implements OnInit {
  fg!: FormGroup;
  category!: Category
  token!: string;
  state!: any;
  @Input() id = '';

  constructor(private readonly _categoryService: CategoryService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    effect(() => {
      this._categoryService.categories()
      const id = this._route.snapshot.paramMap.get('id');
      if (id) {
        const getCategory = this._categoryService.get(Number(id))
        if (getCategory) {
          this.category = getCategory
          this.fg.patchValue(this.category)
        }
      }
    })
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
    });
  }

  update() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

    this._categoryService.update(Number(this.id), this.fg.value, headers)
      .subscribe(
        {
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Category updated', life: 6000 });
            this._router.navigate(['/categories']);
          },
          error: err => {
            this._messageService.add({ severity: 'error', summary: 'Invalid', detail: `${err.error}`, life: 6000 });
          }
        }
      )
  }

}
