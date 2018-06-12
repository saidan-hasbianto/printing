import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { PaymPurchList } from '../models/paym-purch-list';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class PaymPurchListService {
  private url = environment.baseUrl + 'pays/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<PaymPurchList[]> {
    return this.http.get<PaymPurchList[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getSingle(id: number): Observable<PaymPurchList> {
    return this.http.get<PaymPurchList>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<PaymPurchList>('getSingle'))
    );
  }

    /** POST: add a new hero to the server */
  add (prod: PaymPurchList): Observable<PaymPurchList> {
    return this.http.post<PaymPurchList>(this.url, prod, httpOptions).pipe(
      tap((prod: PaymPurchList) => {
        this.logErrorHandle.log('Payment Purchase', + prod.id + ' successfully added', 0);
      }),
    );
  }

  update (prod: PaymPurchList) {
    return this.http.put<PaymPurchList>(this.url + prod.id + '/', prod, httpOptions).pipe(
      tap((prod: PaymPurchList) => {
        this.logErrorHandle.log('Updated Payment Purchase', + prod.id + ' successfully updated', 0);
      }),
    );
  }

  delete (prod: PaymPurchList | number): Observable<PaymPurchList> {
    const id = typeof prod === 'number' ? prod : prod.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<PaymPurchList>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Payment Purchase', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<PaymPurchList>('delete'))
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
        this.toastr.success('PaymPurchListService: ' + message, 'PaymPurchList');
        break;
      }
      case 1: {
        this.toastr.info('PaymPurchListService: ' + message, 'PaymPurchList');
        break;
      }
      case 2: {
        this.toastr.warning('PaymPurchListService: ' + message, 'PaymPurchList');
        break;
      }
      case 3: {
        this.toastr.error('PaymPurchListService: ' + message, 'PaymPurchList');
        break;
      }
      default : {
        break;
      }
    }
  }
}
