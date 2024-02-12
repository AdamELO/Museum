import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  login(form : Auth){
    return this._httpClient.post<{ token: string }>('http://localhost:5190/api/login', form)
    // .pipe(
    //   map((response: any) => {
    //     const user = response;
    //     if (user) {
    //       localStorage.setItem('token', user.token);
    //       this.decodedToken = this.jwtHelper.decodeToken(user.token);
    //     }
    //   })
    // );
  }
}

// login() {
//   this.authService.login(this.model).subscribe(next => {
//     console.log('Logged in successfully');
//   }, error => {
//     console.log('Failed to login');
//   }, () => {
//     this.router.navigate(['/members']);
//   });
// }
