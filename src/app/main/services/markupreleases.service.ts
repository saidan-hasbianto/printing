import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { LogErrorHandleService } from './log-error-handle.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { Markupreleases, Markupreleases2 } from '../models/markupreleases';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MarkupreleasesService {
  private url = environment.baseUrl + 'markupreleases/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Markupreleases[]> {
    return this.http.get<Markupreleases[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getItem(id: number): Observable<Markupreleases2> {
    return this.http.get<Markupreleases2>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Markupreleases2>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Markupreleases2): Observable<Markupreleases2> {
    return this.http.post<Markupreleases2>(this.url, item, httpOptions).pipe(
      tap((item: Markupreleases2) => {
        this.logErrorHandle.log('Markup', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Markupreleases2) {
    return this.http.put<Markupreleases2>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Markupreleases2) => {
        this.logErrorHandle.log('Markup', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Markupreleases2): Observable<Markupreleases2> {
    return this.http.delete<Markupreleases2>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Markup', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Markupreleases2>('delete'))
    );
  }
}
