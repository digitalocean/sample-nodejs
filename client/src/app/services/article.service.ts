
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IArticle, { IArticleSave, ResponseDTO,FilterStatus,PagedData } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private _http: HttpClient) {}

  saveArticle(article: IArticleSave): Observable<ResponseDTO<IArticle>> {
    return this._http.post<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/add`,
      article,
      { withCredentials: true }
    );
  }

  updateArticle(article: IArticleSave, id: string): Observable<ResponseDTO<IArticle>> {
    return this._http.put<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/update/${id}`,
      article,
      { withCredentials: true }
    );
  }

  deleteArticle(id: string): Observable<ResponseDTO<IArticle>> {
    return this._http.delete<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/delete/${id}`,
      { withCredentials: true }
    );
  }

  getAllArticle(
    page: number,
    pageSize: number,
    userWise:boolean = false,
  ): Observable<ResponseDTO<PagedData<IArticle>>> {
    return this._http.get<ResponseDTO<PagedData<IArticle>>>(
      `${environment.serverUrl}/article/getall`,
      {
        withCredentials: true,
        params: {
          userWise:userWise,
          page: page,
          pageSize: pageSize,
        },
      }
    );
  }

  searchArticle(
    page: number,
    pageSize: number,    
    status: FilterStatus,
    client: string,
    userWise:boolean = false,
    batch:string,
    sd?: Date,
    ed?: Date,
    assignedTo?:string,
  ): Observable<ResponseDTO<PagedData<IArticle>>> {
    let params:any={
      userWise:userWise,
      page: page,
      pageSize: pageSize,      
      status: (status.toString()),
      client: (client),
      batch:(batch)
    };
    if(assignedTo){
      params["assignedTo"]=assignedTo.toString();
    }
    if(sd){
      params["sd"]=sd.toString();
    }
    if(ed){
      params["ed"]=ed.toString();
    }
    return this._http.get<ResponseDTO<PagedData<IArticle>>>(
      `${environment.serverUrl}/article/search`,
      {
        withCredentials: true,
        params: params,
      }
    );
  }

  exportDashboard(    
    filter:boolean,
    status: FilterStatus,
    client: string,
    userWise:boolean = false,
    batch:string,
    sd?: Date,
    ed?: Date,
    assignedTo?:string
    ):any {
      let params :any={
        userWise:userWise,        
        filter:filter,
        status: (status.toString()),
        client: (client),
        batch:(batch)
      };
      if(assignedTo){
        params["assignedTo"]=assignedTo.toString();
      }
      if(sd){
        params["sd"]=sd.toString();
      }
      if(ed){
        params["ed"]=ed.toString();
      }
    return this._http.get(
      `${environment.serverUrl}/article/export`,
      {
        withCredentials: true,        
        responseType:"blob",
        params: params,
      }
    );
  }

  // getAllArticleByUser(
  //   page: number,
  //   pageSize: number
  // ): Observable<ResponseDTO<IArticle[]>> {
  //   return this._http.get<ResponseDTO<IArticle[]>>(
  //     `${environment.serverUrl}/article/getAllArticleByUser`,
  //     {
  //       withCredentials: true,
  //       params: {
  //         page: page,
  //         pageSize: pageSize,
  //       },
  //     }
  //   );
  // }
  importArticle(articles: IArticleSave[],isAdmin:boolean): Observable<ResponseDTO<IArticle>> {
    return this._http.post<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/import?isAdmin=${isAdmin}`,
      articles,
      { withCredentials: true }
    );
  }
  closeArticle(id: string): Observable<ResponseDTO<IArticle>> {
    return this._http.post<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/close/${id}`, {},
      { withCredentials: true }
    );
  }
  getMyOpen(userWise:boolean = false):Observable<ResponseDTO<IArticle[]>> {
    return this._http.get<ResponseDTO<IArticle[]>>(
      `${environment.serverUrl}/article/getmyopen`,
      {
        withCredentials: true,
        params: {
          userWise:userWise,          
        },    
      }
    );
  }
}
