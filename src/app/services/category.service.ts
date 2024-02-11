import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories: WritableSignal<Category[]> = signal([]);

  get categories(): Signal<Category[]> {
    return this._categories.asReadonly();
  }

  constructor(private readonly httpClient: HttpClient) {
    this.httpClient.get<Category[]>('http://localhost:5190/api/Category')
    .subscribe(result => {
      this._categories.set(result);
    });
  }

}
