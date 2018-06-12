import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Msoperator } from '../models/msoperator';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MsoperatorService {
  private url = environment.baseUrl + 'operators/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Msoperator[]> {
    return this.http.get<Msoperator[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getItem(id: number): Observable<Msoperator> {
    return this.http.get<Msoperator>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Msoperator>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Msoperator): Observable<Msoperator> {
    return this.http.post<Msoperator>(this.url, item, httpOptions).pipe(
      tap((item: Msoperator) => {
        this.logErrorHandle.log('Operator', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Msoperator) {
    return this.http.put<Msoperator>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Msoperator) => {
        this.logErrorHandle.log('Updated Operator', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Msoperator): Observable<Msoperator> {
    return this.http.delete<Msoperator>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Operator ID ', item.id + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Msoperator>('delete'))
    );
  }

}
