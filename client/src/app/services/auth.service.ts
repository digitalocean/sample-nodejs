import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, ResponseDTO } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('user') !== undefined;
  }

  getLoggedInUser(): IUser | null {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  login(username: string, password: string): Observable<ResponseDTO<IUser>> {
    return this._http.post<ResponseDTO<IUser>>(`${environment.serverUrl}/auth/login`, { username, password }, { withCredentials: true });
  }

  logout(): Observable<ResponseDTO<string>> {
    return this._http.get<ResponseDTO<string>>(`${environment.serverUrl}/auth/logout`, { withCredentials: true });
  }

  passwordResetRequest(email: string): Observable<ResponseDTO<IUser>> {
    return this._http.post<ResponseDTO<IUser>>(`${environment.serverUrl}/auth/passwordresetrequest`, { email }, { withCredentials: true });
  }
}
