import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { ExhibitionService } from '../../../../services/exhibition.service';
import { Exhibition } from '../../../../models/exhibitions.model';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { Floor } from '../../../../models/floor.model';
import { FloorService } from '../../../../services/floor.service';
// import imageToBase64  from 'image-to-base64/image-to-base64.min.js';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-exhibition',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    EditorModule,
    CalendarModule,
    MultiSelectModule,
    InputTextareaModule,
    FileUploadModule,
    CardModule,
    DropdownModule
  ],
  templateUrl: './AddExhibition.component.html',
  styleUrl: './AddExhibition.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExhibitionComponent implements OnInit {

  fg!: FormGroup;
  token!: string;
  state!: any;
  categories: Signal<Category[]>
  floors: Signal<Floor[]>

  constructor(private readonly _exhibitionService: ExhibitionService, private readonly _floorService:FloorService, private readonly _categoryService: CategoryService, private readonly _fb: FormBuilder, private readonly _route: ActivatedRoute, private readonly _messageService: MessageService, private readonly _store: Store, private readonly _router: Router) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
    });
    this.categories = this._categoryService.categories;
    this.floors = this._floorService.floors;
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

  // imageToBase64("path/to/file.jpg") // Path to the image
  //   .then(
  //       (response) => {
  //           console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
  //       }
  //   )
  //   .catch(
  //       (error) => {
  //           console.log(error); // Logs an error if there was one
  //       }
  //   )

  // toDataURL(url: any) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     var reader = new FileReader();
  //     // reader.onloadend = function () {
  //     //     callback(reader.result);
  //     // }
  //     console.log(reader.result);
      
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  //   console.log(xhr.response);
    
  // }

  // _handleReaderLoaded(readerEvt: any) {
  //   var binaryString = readerEvt.target.result;
  //   const base64textString = btoa(binaryString);
  //   console.log(btoa(binaryString));
  // }


  create() {
    if (this.fg.invalid) {
      this._messageService.add({ severity: 'danger', summary: 'Invalid', detail: 'Invalid form', life: 3000 });
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    // C:\fakepath\
    // this.toDataURL((this.fg.value.image).substring(12))
    // console.log((this.fg.value.image).substring(12));


    const exhibition: Exhibition = this.fg.value



    // this._exhibitionService.add(exhibition, headers).subscribe({
    //   next: () => {
    //     this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Exhibition added', life: 3000 });
    //     this._router.navigate(['/exhibitions']);
    //   },
    //   error: err => {
    //     this._messageService.add({ severity: 'error', summary: 'Failed', detail: `${err}`, life: 3000 });
    //     console.log(err);
    //   }
    // })
  }

  onUpload(event: UploadEvent) {

  }

}
