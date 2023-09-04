import { IResetPassword, PagedData } from 'src/app/shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILeave, ResponseDTO } from '../shared/types';
import { CommonModule } from '@angular/common'


@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private _http: HttpClient) { }

  saveLeave(leave: ILeave): Observable<ResponseDTO<ILeave>> {
    let data = { ...leave }
    delete data._id;
    return this._http.post<ResponseDTO<ILeave>>(
      `${environment.serverUrl}/leave/add`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  updateLeave(leave: ILeave, id: string): Observable<ResponseDTO<ILeave>> {
    let data = { ...leave }
    delete data._id;
    return this._http.post<ResponseDTO<ILeave>>(
      `${environment.serverUrl}/leave/update/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getAllLeaves(
    page: number,
    pageSize: number,
    userWise: boolean): Observable<ResponseDTO<PagedData<ILeave>>> {
    return this._http.get<ResponseDTO<PagedData<ILeave>>>(
      `${environment.serverUrl}/leave/getAll`,
      {
        withCredentials: true,
        params: {
          userWise: userWise,
          page: page,
          pageSize: pageSize,
        },
      }
    );
  }

  deleteLeave(id: string): Observable<ResponseDTO<ILeave>> {
    return this._http.delete<ResponseDTO<ILeave>>(
      `${environment.serverUrl}/leave/delete/${id}`,
      { withCredentials: true }
    );
  }
  approveLeave(id: string, approval: boolean): Observable<ResponseDTO<ILeave>> {
    return this._http.get<ResponseDTO<ILeave>>(
      `${environment.serverUrl}/leave/approve/${id}`,
      {
        withCredentials: true,
        params: {
          _id: id,
          approval: approval
        }
      }
    );
  }
  exportLeaves(userWise: boolean): any {
    return this._http.get(
      `${environment.serverUrl}/leave/export`,
      {
        withCredentials: true,
        responseType: "blob",
        params: {
          userWise: true,
        }
      }
    );
  }
}
