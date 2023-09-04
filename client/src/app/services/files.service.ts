import { IResetPassword, PagedData } from 'src/app/shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, ResponseDTO } from '../shared/types';


@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private _http: HttpClient) { }
  upload(formData: FormData): Observable<ResponseDTO<string>> {    
    return this._http.post<ResponseDTO<string>>(
      `${environment.serverUrl}/files/upload`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
}
