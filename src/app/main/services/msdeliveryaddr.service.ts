import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Msdeliveryaddr } from '../models/msdeliveryaddr';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MsdeliveryaddrService {
  private url = environment.baseUrl + 'deliveryaddresses/';  // URL to web api
  private url2 = environment.baseUrl + 'deliveryaddresses/?customer=';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Msdeliveryaddr[]> {
    return this.http.get<Msdeliveryaddr[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getRowsForJO(id: number): Observable<Msdeliveryaddr[]> {
    return this.http.get<Msdeliveryaddr[]>(this.url2 + id, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRowsForJO', []))
    );
  }

  getPrice(id: number): Observable<Msdeliveryaddr> {
    return this.http.get<Msdeliveryaddr>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Msdeliveryaddr>('getPrice'))
    );
  }

    /** POST: add a new hero to the server */
  add (price: Msdeliveryaddr): Observable<Msdeliveryaddr> {
    return this.http.post<Msdeliveryaddr>(this.url, price, httpOptions).pipe(
      tap((price: Msdeliveryaddr) => this.logErrorHandle.log('Price ID =', + price.id + ' successfully added', 0)),
      catchError(this.logErrorHandle.handleError<Msdeliveryaddr>('add'))
    );
  }

  update (price: Msdeliveryaddr) {
    return this.http.put<Msdeliveryaddr>(this.url + price.id + '/', price, httpOptions).pipe(
      tap((price: Msdeliveryaddr) => {
        this.logErrorHandle.log('Updated Price ID =', + price.id + ' successfully updated', 0);
      }),
      catchError(this.logErrorHandle.handleError<Msdeliveryaddr>('update'))
    );
  }

  delete (price: Msdeliveryaddr | number): Observable<Msdeliveryaddr> {
    const id = typeof price === 'number' ? price : price.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<Msdeliveryaddr>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Price id=', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Msdeliveryaddr>('delete'))
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
