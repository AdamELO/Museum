import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { Category } from '../../../../models/category.model';
import { Floor } from '../../../../models/floor.model';
import { Exhibition } from '../../../../models/exhibitions.model';
import { ExhibitionService } from '../../../../services/exhibition.service';
import { FloorService } from '../../../../services/floor.service';
import { CategoryService } from '../../../../services/category.service';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-exhibition',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    CalendarModule,
    MultiSelectModule,
    InputTextareaModule,
    FileUploadModule,
    CardModule,
    DropdownModule
  ],
  templateUrl: './UpdateExhibition.component.html',
  styleUrl: './UpdateExhibition.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateExhibitionComponent implements OnInit {
  fg!: FormGroup;
  token!: string;
  state!: any;
  categories: Signal<Category[]>
  floors: Signal<Floor[]>
  exhibition!: Exhibition
  @Input() id = '';

  constructor(private readonly _exhibitionService: ExhibitionService, private readonly _floorService: FloorService, private readonly _categoryService: CategoryService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    this.categories = this._categoryService.categories;
    this.floors = this._floorService.floors;

    effect(() => {
      this._categoryService.categories()
      const id = this._route.snapshot.paramMap.get('id');
      if (id) {
        const getExhibition = this._exhibitionService.get(Number(id))
        if (getExhibition) {
          this.exhibition = getExhibition
          this.fg.patchValue(this.exhibition)
          this.fg.patchValue({startDate: this.dateFormatInital(this.exhibition.startDate),endDate: this.dateFormatInital(this.exhibition.endDate), })
          // this.fg.patchValue({categoriesName: this.exhibition.categories})
          // this.fg.patchValue({floorNumber: Number(this.exhibition.floor.floorNumber) })
          // console.log(this.exhibition.categories, this.exhibition.floor);
          // console.log(this.fg.value);
        }
      }
    })
  }

  dateFormatInital(date: Date) : Date{
    const datestring = date
    return new Date(datestring + ".000Z");
  }

  ngOnInit() {
    this.fg = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      floorNumber: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      maxPerson: [null, [Validators.required]],
      categoriesName: [null, [Validators.required]],
    });
  }

  update() {
    // console.log(this.fg.value.floorNumber);
    // return;
    
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

    this._categoryService.update(Number(this.id), this.fg.value, headers)
      .subscribe(
        {
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Exhibition updated', life: 6000 });
            this._router.navigate(['/exhibitions']);
          },
          error: err => {
            this._messageService.add({ severity: 'error', summary: 'Invalid', detail: `${err.error}`, life: 6000 });
          }
        }
      )
  }


  uploadFile(event: any) {
    if (!event.currentFiles.length) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(event.currentFiles[0]);
    reader.onload = (e) => {
      this.fg.patchValue({ image: (<string>e.target?.result).split(',')[1] });
    }
  }

  dateFormating(date: string): string {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hour = String(inputDate.getHours()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}T${hour}:00:00Z`;
    return formattedDateString
  }

}
