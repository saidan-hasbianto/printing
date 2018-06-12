import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { PurchItem } from '../models/purch-item';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class PurchItemService {
  private urlProd = environment.baseUrl + 'purchases/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<PurchItem[]> {
    return this.http.get<PurchItem[]>(this.urlProd, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getSingle(id: number): Observable<PurchItem> {
    return this.http.get<PurchItem>(`${this.urlProd}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<PurchItem>('getSingle'))
    );
  }

    /** POST: add a new hero to the server */
  add (prod: PurchItem): Observable<PurchItem> {
    return this.http.post<PurchItem>(this.urlProd, prod, httpOptions).pipe(
      tap((prod: PurchItem) => {
        this.logErrorHandle.log('Purchase Item', + prod.id + ' successfully added', 0);
      }),
    );
  }

  update (prod: PurchItem) {
    return this.http.put<PurchItem>(this.urlProd + prod.id + '/', prod, httpOptions).pipe(
      tap((prod: PurchItem) => {
        this.logErrorHandle.log('Updated Purchase Item', + prod.id + ' successfully updated', 0);
      }),
    );
  }

  delete (prod: PurchItem | number): Observable<PurchItem> {
    const id = typeof prod === 'number' ? prod : prod.id;
    const url = `${this.urlProd}${id}/`;

    return this.http.delete<PurchItem>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Purchase Item', + '${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<PurchItem>('delete'))
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
        this.toastr.success('purch-itemService: ' + message, 'Product');
        break;
      }
      case 1: {
        this.toastr.info('purch-itemService: ' + message, 'Product');
        break;
      }
      case 2: {
        this.toastr.warning('purch-itemService: ' + message, 'Product');
        break;
      }
      case 3: {
        this.toastr.error('purch-itemService: ' + message, 'Product');
        break;
      }
      default : {
        break;
      }
    }
  }
}
