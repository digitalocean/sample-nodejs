import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  catchError,
  EMPTY,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { statusCode } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ResponseInterceptorService implements HttpInterceptor {
  refreshingAccessToken: boolean = false;

  accessTokenRefreshed: Subject<any> = new Subject();

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === statusCode.REFRESH_TOKEN_EXPIRED) {
          localStorage.clear();
          this._snackBar.open('Session expired. Please, login again', '', {
            duration: 3000,
          });
          this._router.navigate(['/login']);
          return EMPTY;
        }
        if (error.status === statusCode.UNAUTHENTICATED) {
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              return next.handle(request);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      return this.fetchAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(true);
          console.log('token refreshed');
        })
      );
    }
  }

  fetchAccessToken(): Observable<string> {
    return this._http.get<string>(`${environment.serverUrl}/auth/refresh`, {
      withCredentials: true,
    });
  }
}
