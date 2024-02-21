import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Register } from '../models/register.model';
import { environment } from '../../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  login(form : Auth){
    return this._httpClient.post<{ token: string }>( environment.Base_URL + 'Security', form)
  }

  register(form: Register){
    return this._httpClient.post(environment.Base_URL + 'User', form)
  }
}
