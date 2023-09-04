import { IResetPassword, PagedData } from 'src/app/shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAnnouncement, ResponseDTO } from '../shared/types';
import { CommonModule } from '@angular/common'
     

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private _http: HttpClient) {}

  saveAnnouncement(announcement: IAnnouncement): Observable<ResponseDTO<IAnnouncement>> {
    let data = {...announcement}
    delete data._id;
    return this._http.post<ResponseDTO<IAnnouncement>>(
      `${environment.serverUrl}/announcement/add`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  updateAnnouncement(announcement: IAnnouncement,id:string): Observable<ResponseDTO<IAnnouncement>> {
    let data = {...announcement}
    delete data._id;
    return this._http.post<ResponseDTO<IAnnouncement>>(
      `${environment.serverUrl}/announcement/update/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getAllAnnouncements(
    page: number,
    pageSize: number): Observable<ResponseDTO<PagedData<IAnnouncement>>> {
    return this._http.get<ResponseDTO<PagedData<IAnnouncement>>>(
      `${environment.serverUrl}/announcement/getAll`,
      {
        withCredentials: true,
        params:{
          page: page,
          pageSize: pageSize,
        },  
      }
    );
  }

  deleteAnnouncement(id: string): Observable<ResponseDTO<IAnnouncement>> {
    return this._http.delete<ResponseDTO<IAnnouncement>>(
      `${environment.serverUrl}/announcement/delete/${id}`,
      { withCredentials: true }
    );
  }
  exportAnnouncements():any {
    return this._http.get(
      `${environment.serverUrl}/announcement/export`,
      {
        withCredentials: true,        
        responseType:"blob",
      }
    );
  }
}
