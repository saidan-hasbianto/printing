import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Msactivity } from '../models/msactivity';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MsactivityService {
  private url = environment.baseUrl + 'activities/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Msactivity[]> {
    return this.http.get<Msactivity[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getItem(id: number): Observable<Msactivity> {
    return this.http.get<Msactivity>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Msactivity>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Msactivity): Observable<Msactivity> {
    return this.http.post<Msactivity>(this.url, item, httpOptions).pipe(
      tap((item: Msactivity) => {
        this.logErrorHandle.log('Activity ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Msactivity) {
    return this.http.put<Msactivity>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Msactivity) => {
        this.logErrorHandle.log('Updated Activity ID =', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Msactivity): Observable<Msactivity> {
    return this.http.delete<Msactivity>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Activity ID ', item.id + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Msactivity>('delete'))
    );
  }
}
