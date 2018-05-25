import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Joborders, Joborders2 } from '../models/joborders';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

const httpOptions2 = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'multipart/form-data'
    }
  )
};

@Injectable()
export class JobordersService {
  private url = environment.baseUrl + 'joborders/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Joborders[]> {
    return this.http.get<Joborders[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getJO(id: number): Observable<Joborders2> {
    return this.http.get<Joborders2>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Joborders2>('getJO'))
    );
  }

  getJO1(id: number): Observable<Joborders> {
    return this.http.get<Joborders>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Joborders>('getJO'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Joborders): Observable<Joborders> {
    return this.http.post<Joborders>(this.url, item, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((item: Joborders) => {
        // this.logErrorHandle.log('Job Order ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  // update (item: Joborders) {
  //   return this.http.put<Joborders>(this.url + item.id + '/', item, httpOptions).pipe(
  //     tap((item: Joborders) => {
  //       this.logErrorHandle.log('Job Order ID =', + item.id + ' successfully updated', 0);
  //     }),
  //   );
  // }

  // delete (item: Joborders): Observable<Joborders> {
  //   return this.http.delete<Joborders>(`${this.url}${item.id}/`, httpOptions).pipe(
  //   tap(_ => this.logErrorHandle.log('Job Order ID ', item.id + ' successfully deleted', 0)),
  //   catchError(this.logErrorHandle.handleError<Joborders>('delete'))
  //   );
  // }

  postFile(item: Joborders2): Observable<any> {
    console.log(item);
    const endpoint = this.url;
    const formData: FormData = new FormData();
      formData.append('jobOrderNo', item.jobOrderNo);
      formData.append('customer', item.customer);
      formData.append('refNo', item.refNo);
      formData.append('orderDate', item.orderDate);
      formData.append('completionDate', item.completionDate);
      formData.append('deliveryAddress', item.deliveryAddress);
      formData.append('remarks', item.remarks);
      formData.append('operator', item.operator);
      formData.append('status', item.status);

      for (let i = 0; i < item['product'].length; i++)
      {
        // console.log(item.product);
        formData.append('product', item.product[i].toString());
        formData.append('qty', item.qty[i].toString());
        formData.append('type', item.type[i]);
        formData.append('price', item.price[i].toString());
        formData.append('markup', item.markup[i].toString());
        formData.append('fileSource', item.fileSource[i]);
        formData.append('fileName', item.fileName[i], item.fileName[i].name);
      }
      return this.http
        .post(endpoint, formData);
        // .map(() => {
        //   return true; });
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
        this.toastr.success('RtService: ' + message, 'RT');
        break;
      }
      case 1: {
        this.toastr.info('RtService: ' + message, 'RT');
        break;
      }
      case 2: {
        this.toastr.warning('RtService: ' + message, 'RT');
        break;
      }
      case 3: {
        this.toastr.error('RtService: ' + message, 'RT');
        break;
      }
      default : {
        break;
      }
    }
  }
}
