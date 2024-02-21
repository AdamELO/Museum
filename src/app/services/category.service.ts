import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environment';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories: WritableSignal<Category[]> = signal([]);
  get categories(): Signal<Category[]> {
    return this._categories.asReadonly();
  }

  private _category: WritableSignal<Category | null> = signal(null);
  public get category(): Signal<Category | null> {
    return this._category.asReadonly();
  }

  get(id: number) {
    return this.categories().find(c => c.id === id);
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<Category[]>(environment.Base_URL + 'Category')
      .subscribe(result => {
        this._categories.set(result);
      });
  }

  remove(id: number, headers: any) {
    return this._httpClient.delete(environment.Base_URL + 'Category/' + id, headers)
    .pipe(tap(result => {
      this._categories.update(l => l.filter(c => c.id !== id));
    }))
      // .subscribe(() => {
      //   this._categories.update(l => l.filter(c => c.id !== id));
      // })
  }

  update(id: number, modifiedCategory: Category, headers: any): Observable<Category> {
    const c = this.get(id);
    if (!c) {
      return throwError(() => of());
    }
    return this._httpClient.put<Category>(environment.Base_URL + 'Category/' + id, modifiedCategory, { headers })
      .pipe(tap(result => {
        Object.assign(c, modifiedCategory);
        this._categories.update(l => [...l]);
      }))
  }

  add(c: Category, headers: any) {
    return this._httpClient.post<Category>(environment.Base_URL + 'Category', c, { headers })
      .pipe(tap(result => {
        this._categories.update(l => [...l, result]);
      }))
  }

}
