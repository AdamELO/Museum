import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Register } from '../models/register.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  login(form : Auth){
    return this._httpClient.post<{ token: string }>('http://localhost:5190/api/Security', form)
  }

  register(form: Register){
    return this._httpClient.post('http://localhost:5190/api/User', form)
  }
}
