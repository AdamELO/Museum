import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  login(form: { username?: string, email?: string ,password: string }){
    return this._httpClient.post<{ token: string }>('http://localhost:5190/api/login', form)
  }
}