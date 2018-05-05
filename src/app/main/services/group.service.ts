import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Groups } from '../models/groups';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class GroupService {
  private url = environment.baseUrl + 'groups/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Groups[]> {
    return this.http.get<Groups[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getGroup(id: number): Observable<Groups> {
    return this.http.get<Groups>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Groups>('getGroup'))
    );
  }

  /** POST: add a new hero to the server */
  add (item: Groups): Observable<Groups> {
    return this.http.post<Groups>(this.url, item, httpOptions).pipe(
      tap((item: Groups) => {
        this.logErrorHandle.log('Group ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Groups) {
    return this.http.put<Groups>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Groups) => {
        this.logErrorHandle.log('Updated Group =', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Groups): Observable<Groups> {
    return this.http.delete<Groups>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Msitem', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Groups>('delete'))
    );
  }
}
