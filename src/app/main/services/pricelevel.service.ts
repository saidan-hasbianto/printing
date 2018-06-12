import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from './log-error-handle.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Pricelevel } from '../models/pricelevel';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class PricelevelService {
  private url = environment.baseUrl + 'pricelevels/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private logErrorHandle: LogErrorHandleService
  ) { }
  getRows(): Observable<Pricelevel[]> {
    return this.http.get<Pricelevel[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getPrice(id: number): Observable<Pricelevel> {
    return this.http.get<Pricelevel>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Pricelevel>('getPrice'))
    );
  }

    /** POST: add a new hero to the server */
  add (price: Pricelevel): Observable<Pricelevel> {
    return this.http.post<Pricelevel>(this.url, price, httpOptions).pipe(
      tap((price: Pricelevel) => this.logErrorHandle.log('Price ID', + price.id + ' successfully added', 0)),
      catchError(this.logErrorHandle.handleError<Pricelevel>('add'))
    );
  }

  update (price: Pricelevel) {
    return this.http.put<Pricelevel>(this.url + price.id + '/', price, httpOptions).pipe(
      tap((price: Pricelevel) => {
        this.logErrorHandle.log('Updated Price Level', + price.id + ' successfully updated', 0);
      }),
      catchError(this.logErrorHandle.handleError<Pricelevel>('update'))
    );
  }

  delete (price: Pricelevel | number): Observable<Pricelevel> {
    const id = typeof price === 'number' ? price : price.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<Pricelevel>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Price Level', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Pricelevel>('delete'))
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
