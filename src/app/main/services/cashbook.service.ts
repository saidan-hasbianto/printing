import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cashbook } from '../models/cashbook';
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
export class CashbookService {
  private url = environment.baseUrl + 'cbledgers/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Cashbook[]> {
    return this.http.get<Cashbook[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getItem(id: number): Observable<Cashbook> {
    return this.http.get<Cashbook>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Cashbook>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Cashbook): Observable<Cashbook> {
    return this.http.post<Cashbook>(this.url, item, httpOptions).pipe(
      tap((item: Cashbook) => {
        this.logErrorHandle.log('Cash Book', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Cashbook) {
    return this.http.put<Cashbook>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Cashbook) => {
        this.logErrorHandle.log('Cash Book', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Cashbook): Observable<Cashbook> {
    return this.http.delete<Cashbook>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Cash Book', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Cashbook>('delete'))
    );
  }
}
