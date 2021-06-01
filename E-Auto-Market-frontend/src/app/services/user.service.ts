import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  userInfo: any = {};

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login/', {
      email,
      password
    });
  }


  signUp(email, password): Observable<any> {
    return this.http.post('/api/signUp/', {
      email,
      password
    });
  }

  createUser(email: string, password: string, code: string, role: number): Observable<any> {
    return this.http.post('/api/user/', {
      email,
      password,
      token: code,
      roles: role
    });
  }

  updateUser(user: any): Observable<any> {
    return this.http.patch('/api/user/' + user.id + '/', user);
  }
}
