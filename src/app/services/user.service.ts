import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environment';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: WritableSignal<User[]> = signal([]);
  get users(): Signal<User[]> {
    return this._users.asReadonly();
  }


  private _user: WritableSignal<User | null> = signal(null);
  public get user(): Signal<User | null> {
    return this._user.asReadonly();
  }

  get(id: number) {
    return this.users().find(u => u.id === id);
  }

  constructor(private readonly _httpClient: HttpClient) {
    this._httpClient.get<User[]>(environment.Base_URL + 'User')
      .subscribe(result => {
        this._users.set(result);
      });
  }

  remove(id: number, headers: any) {
    this._httpClient.patch(environment.Base_URL + 'User/' + id, headers)
      .subscribe(() => {
        this._users.update(l => l.filter(u => u.id !== id));
      })
  }

  activate(id: number, headers: any) {
    this._httpClient.patch(environment.Base_URL + 'User/' + id, headers)
      .subscribe(() => {
        this._users.update(l => l.filter(f => f.id !== id));
      })
  }

  update(id: number, modifiedUser: User, headers: any): Observable<User> {
    const u = this.get(id);
    if (!u) {
      return throwError(() => of());
    }
    return this._httpClient.put<User>(environment.Base_URL + 'User/' + id, modifiedUser, { headers })
      .pipe(tap(result => {
        Object.assign(u, modifiedUser);
        this._users.update(l => [...l]);
      }))

  }

}
