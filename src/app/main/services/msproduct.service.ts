import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Msproduct } from '../models/msproduct';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MsproductService {
  private urlProd = environment.baseUrl + 'products/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }
  getRows(): Observable<Msproduct[]> {
    return this.http.get<Msproduct[]>(this.urlProd, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getProd(id: number): Observable<Msproduct> {
    return this.http.get<Msproduct>(`${this.urlProd}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Msproduct>('getProd'))
    );
  }

    /** POST: add a new hero to the server */
  add (prod: Msproduct): Observable<Msproduct> {
    return this.http.post<Msproduct>(this.urlProd, prod, httpOptions).pipe(
      tap((prod: Msproduct) => {
        this.logErrorHandle.log('Product', + prod.id + ' successfully added', 0);
      }),
    );
  }

  update (prod: Msproduct) {
    return this.http.put<Msproduct>(this.urlProd + prod.id + '/', prod, httpOptions).pipe(
      tap((prod: Msproduct) => {
        this.logErrorHandle.log('Updated Product', + prod.id + ' successfully updated', 0);
      }),
    );
  }

  delete (prod: Msproduct | number): Observable<Msproduct> {
    const id = typeof prod === 'number' ? prod : prod.id;
    const url = `${this.urlProd}${id}/`;

    return this.http.delete<Msproduct>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Product', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Msproduct>('delete'))
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
        this.toastr.success('MsproductService: ' + message, 'Product');
        break;
      }
      case 1: {
        this.toastr.info('MsproductService: ' + message, 'Product');
        break;
      }
      case 2: {
        this.toastr.warning('MsproductService: ' + message, 'Product');
        break;
      }
      case 3: {
        this.toastr.error('MsproductService: ' + message, 'Product');
        break;
      }
      default : {
        break;
      }
    }
  }
}
