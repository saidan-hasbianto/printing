import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Msitem } from '../models/msitem';
import { LogErrorHandleService } from './log-error-handle.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MsitemService {
  private url = environment.baseUrl + 'items/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Msitem[]> {
    return this.http.get<Msitem[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getItem(id: number): Observable<Msitem> {
    return this.http.get<Msitem>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Msitem>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Msitem): Observable<Msitem> {
    return this.http.post<Msitem>(this.url, item, httpOptions).pipe(
      tap((item: Msitem) => {
        this.logErrorHandle.log('Item ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Msitem) {
    return this.http.put<Msitem>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Msitem) => {
        this.logErrorHandle.log('Updated Item Code =', + item.itemCd + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Msitem): Observable<Msitem> {
    return this.http.delete<Msitem>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Msitem', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Msitem>('delete'))
    );
  }

  // // getrowdetail():

  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.error.error_message}`, 3);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // /** Log a RwService message with the MessageService */
  // private log(message: string, type: number) {
  //   switch (type) {
  //     case 0: {
  //       this.toastr.success('MsitemService: ' + message, 'Item');
  //       break;
  //     }
  //     case 1: {
  //       this.toastr.info('MsitemService: ' + message, 'Item');
  //       break;
  //     }
  //     case 2: {
  //       this.toastr.warning('MsitemService: ' + message, 'Item');
  //       break;
  //     }
  //     case 3: {
  //       this.toastr.error('MsitemService: ' + message, 'Item');
  //       break;
  //     }
  //     default : {
  //       break;
  //     }
  //   }
  // }
}
