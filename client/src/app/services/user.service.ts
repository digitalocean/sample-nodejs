import { IResetPassword, PagedData } from 'src/app/shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, ResponseDTO } from '../shared/types';
import { CommonModule } from '@angular/common'


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) { }

  saveUser(user: IUser): Observable<ResponseDTO<IUser>> {
    let data = { ...user }
    delete data._id;
    return this._http.post<ResponseDTO<IUser>>(
      `${environment.serverUrl}/user/add`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  updateUser(user: IUser, id: string): Observable<ResponseDTO<IUser>> {
    let data = { ...user }
    delete data._id;
    return this._http.post<ResponseDTO<IUser>>(
      `${environment.serverUrl}/user/update/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getAllUsers(
    page: number,
    pageSize: number
  ): Observable<ResponseDTO<PagedData<IUser>>> {
    return this._http.get<ResponseDTO<PagedData<IUser>>>(
      `${environment.serverUrl}/user/getAll`,
      {
        withCredentials: true,
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
  }

  getResetPasswordUsers(
    page: number,
    pageSize: number
  ): Observable<ResponseDTO<IUser[]>> {
    return this._http.get<ResponseDTO<IUser[]>>(
      `${environment.serverUrl}/user/getforgotpasswordlist`,
      {
        withCredentials: true,
      }
    );
  }
  resetPassword(user: IResetPassword): Observable<ResponseDTO<IUser>> {
    return this._http.post<ResponseDTO<IUser>>(
      `${environment.serverUrl}/user/resetpassword`,
      user,
      {
        withCredentials: true,
      }
    );
  }

  exportUsers(filter: boolean, employeename: string): any {
    let params: any = {
      employeename: employeename,
      filter: filter
    };
    return this._http.get(
      `${environment.serverUrl}/user/export`,
      {
        withCredentials: true,
        responseType: "blob",
        params: params
      }
    );
  }


  getNonAdmin(): Observable<ResponseDTO<IUser[]>> {
    return this._http.get<ResponseDTO<IUser[]>>(
      `${environment.serverUrl}/user/getNonAdmin`,
      {
        withCredentials: true,
      }
    );
  }
  deleteUser(id: string): Observable<ResponseDTO<IUser>> {
    return this._http.delete<ResponseDTO<IUser>>(
      `${environment.serverUrl}/user/delete/${id}`,
      { withCredentials: true }
    );
  }
  searchUser(
    page: number,
    pageSize: number,
    employeename: string
  ): Observable<ResponseDTO<PagedData<IUser>>> {
    return this._http.get<ResponseDTO<PagedData<IUser>>>(
      `${environment.serverUrl}/user/search`,
      {
        withCredentials: true,
        params: {
          page: page,
          pageSize: pageSize,
          employeename: employeename
        }
      }
    );
  }
  getByRole(
    role: string
  ): Observable<ResponseDTO<IUser[]>> {
    return this._http.get<ResponseDTO<IUser[]>>(
      `${environment.serverUrl}/user/getByRole`,
      {
        withCredentials: true,
        params: {
          role: role
        }
      }
    );
  }
}
