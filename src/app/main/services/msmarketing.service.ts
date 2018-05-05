import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Msmarketing } from '../models/msmarketing';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MsmarketingService {
  private url = environment.baseUrl + 'marketings/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Msmarketing[]> {
    return this.http.get<Msmarketing[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getMarketing(id: number): Observable<Msmarketing> {
    return this.http.get<Msmarketing>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Msmarketing>('getMarketing'))
    );
  }

    /** POST: add a new hero to the server */
  add (prod: Msmarketing): Observable<Msmarketing> {
    return this.http.post<Msmarketing>(this.url, prod, httpOptions).pipe(
      tap((prod: Msmarketing) => {
        this.logErrorHandle.log('Marketing ID =', + prod.id + ' successfully added', 0);
      }),
    );
  }

  update (prod: Msmarketing) {
    return this.http.put<Msmarketing>(this.url + prod.id + '/', prod, httpOptions).pipe(
      tap((prod: Msmarketing) => {
        this.logErrorHandle.log('Updated Marketing ID =', + prod.id + ' successfully updated', 0);
      }),
    );
  }

  delete (prod: Msmarketing | number): Observable<Msmarketing> {
    const id = typeof prod === 'number' ? prod : prod.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<Msmarketing>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Marketing id=', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Msmarketing>('delete'))
    );
  }

  // getrowdetail():

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`, 3);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RwService message with the MessageService */
  private log(message: string, type: number) {
    switch (type) {
      case 0: {
        this.toastr.success('MsmarketingService: ' + message, 'Marketing');
        break;
      }
      case 1: {
        this.toastr.info('MsmarketingService: ' + message, 'Marketing');
        break;
      }
      case 2: {
        this.toastr.warning('MsmarketingService: ' + message, 'Marketing');
        break;
      }
      case 3: {
        this.toastr.error('MsmarketingService: ' + message, 'Marketing');
        break;
      }
      default : {
        break;
      }
    }
  }
}
