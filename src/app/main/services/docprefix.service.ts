import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { Docprefix } from '../models/docprefix';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class DocprefixService {
  private url = environment.baseUrl + 'docprefixs/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Docprefix[]> {
    return this.http.get<Docprefix[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getDoc(id: number): Observable<Docprefix> {
    return this.http.get<Docprefix>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Docprefix>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Docprefix): Observable<Docprefix> {
    return this.http.post<Docprefix>(this.url, item, httpOptions).pipe(
      tap((item: Docprefix) => {
        this.logErrorHandle.log('Docprefix ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Docprefix) {
    return this.http.put<Docprefix>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Docprefix) => {
        this.logErrorHandle.log('Docprefix ID =', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Docprefix): Observable<Docprefix> {
    return this.http.delete<Docprefix>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Docprefix', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Docprefix>('delete'))
    );
  }

}
