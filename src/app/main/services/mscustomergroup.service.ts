import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Mscustomer } from '../models/mscustomergroup';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MscustomergroupService {
  private urlProd = environment.baseUrl + 'customers/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Mscustomer[]> {
    return this.http.get<Mscustomer[]>(this.urlProd, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getProd(id: number): Observable<Mscustomer> {
    return this.http.get<Mscustomer>(`${this.urlProd}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Mscustomer>('getProd'))
    );
  }

    /** POST: add a new hero to the server */
  add (prod: Mscustomer): Observable<Mscustomer> {
    return this.http.post<Mscustomer>(this.urlProd, prod, httpOptions).pipe(
      tap((prod: Mscustomer) => {
        this.logErrorHandle.log('Customer', + prod.id + ' successfully added', 0);
      }),
    );
  }

  update (prod: Mscustomer) {
    return this.http.put<Mscustomer>(this.urlProd + prod.id + '/', prod, httpOptions).pipe(
      tap((prod: Mscustomer) => {
        this.logErrorHandle.log('Updated Customer', + prod.id + ' successfully updated', 0);
      }),
    );
  }

  delete (prod: Mscustomer | number): Observable<Mscustomer> {
    const id = typeof prod === 'number' ? prod : prod.id;
    const url = `${this.urlProd}${id}/`;

    return this.http.delete<Mscustomer>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Customer', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Mscustomer>('delete'))
    );
  }

  /* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Mscustomer[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Mscustomer[]>(`api/heroes/?name=${term}`).pipe(
    catchError(this.logErrorHandle.handleError('getRows', []))
  );
}

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
        this.toastr.success('MscustomergroupService: ' + message, 'Customer');
        break;
      }
      case 1: {
        this.toastr.info('MscustomergroupService: ' + message, 'Customer');
        break;
      }
      case 2: {
        this.toastr.warning('MscustomergroupService: ' + message, 'Customer');
        break;
      }
      case 3: {
        this.toastr.error('MscustomergroupService: ' + message, 'Customer');
        break;
      }
      default : {
        break;
      }
    }
  }
}
