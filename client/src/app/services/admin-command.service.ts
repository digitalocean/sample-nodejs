import { IResetPassword, PagedData } from 'src/app/shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdminCommand, ResponseDTO } from '../shared/types';
import { CommonModule } from '@angular/common'
     

@Injectable({
  providedIn: 'root',
})
export class AdminCommandService {
  constructor(private _http: HttpClient) {}

  saveAdminCommand(admincommand: IAdminCommand): Observable<ResponseDTO<IAdminCommand>> {
    let data = {...admincommand}
    delete data._id;
    return this._http.post<ResponseDTO<IAdminCommand>>(
      `${environment.serverUrl}/admincommand/add`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  updateAdminCommand(admincommand: IAdminCommand,id:string): Observable<ResponseDTO<IAdminCommand>> {
    let data = {...admincommand}
    delete data._id;
    return this._http.post<ResponseDTO<IAdminCommand>>(
      `${environment.serverUrl}/admincommand/update/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getAllAdminCommands(): Observable<ResponseDTO<PagedData<IAdminCommand>>> {
    return this._http.get<ResponseDTO<PagedData<IAdminCommand>>>(
      `${environment.serverUrl}/admincommand/getAll`,
      {
        withCredentials: true,
      }
    );
  }

  deleteAdminCommand(id: string): Observable<ResponseDTO<IAdminCommand>> {
    return this._http.delete<ResponseDTO<IAdminCommand>>(
      `${environment.serverUrl}/admincommand/delete/${id}`,
      { withCredentials: true }
    );
  }
}
