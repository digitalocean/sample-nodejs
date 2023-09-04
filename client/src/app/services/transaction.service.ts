import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITransaction, PagedData, ResponseDTO } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private _http: HttpClient) {}

  savetransaction(transaction: ITransaction): Observable<ResponseDTO<ITransaction>> {
    return this._http.post<ResponseDTO<ITransaction>>(
      `${environment.serverUrl}/transaction/add`,
      transaction,
      { withCredentials: true }
    );
  }

  updateTransaction(transaction: ITransaction, id: string): Observable<ResponseDTO<ITransaction>> {
    return this._http.put<ResponseDTO<ITransaction>>(
      `${environment.serverUrl}/transaction/update/${id}`,
      transaction,
      { withCredentials: true }
    );
  }

  getAllTransactions(
    page: number,
    pageSize: number
  ): Observable<ResponseDTO<PagedData<ITransaction>>> {
    return this._http.get<ResponseDTO<PagedData<ITransaction>>>(
      `${environment.serverUrl}/transaction/getall`,
      {
        params: {
          page: page,
          pageSize: pageSize,
        },
        withCredentials: true,
      }
    );
  }

  searchTransaction(
    page: number,
    pageSize: number,    
    forr:string,
    sd?: Date,
    ed?: Date,
  ): Observable<ResponseDTO<PagedData<ITransaction>>> {
    let params:any={
      page: page,
      pageSize: pageSize,
      forr:forr.toString(),
    };
    if(sd){
      params["sd"]=sd.toString();
    }
    if(ed){
      params["ed"]=ed.toString();
    }
    return this._http.get<ResponseDTO<PagedData<ITransaction>>>(
      `${environment.serverUrl}/transaction/search`,
      {
        withCredentials: true,
        params: params
      }
    );
  }

  deleteArticle(id: string): Observable<ResponseDTO<ITransaction>> {
    return this._http.delete<ResponseDTO<ITransaction>>(
      `${environment.serverUrl}/transaction/delete/${id}`,
      { withCredentials: true }
    );
  }
  exportTransactions(
   
    filter:boolean,
    forr:string,
    sd?: Date,
    ed?: Date,
    ):any {
      let params:any = {
        filter:filter,
        forr:forr
      }
      if(sd){
        params["sd"]=sd.toString();
      }
      if(ed){
        params["ed"]=ed.toString();
      }

    return this._http.get(
      `${environment.serverUrl}/transaction/export`,
      {
        withCredentials: true,        
        responseType:"blob",
        params: params,
      }
    );
  }

}
