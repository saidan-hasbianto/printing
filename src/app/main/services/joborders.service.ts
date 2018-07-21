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
  private url2 = environment.baseUrl + 'jounreceiptedsbycustomer/?customer=';  // URL to web api
  private url3 = environment.baseUrl + 'joundelivereds/';  // URL to web api
  private url4 = environment.baseUrl + 'jopdf/?id=';  // URL to web api
  private url5 = environment.baseUrl + 'joborderforusers/';  // URL to web api
  private urlsendtoAdmin = environment.baseUrl + 'joupdatestatusnext/';  // URL to web api
  private urljood = environment.baseUrl + 'jooverdues/';  // URL to web api
  private urljounreceipt = environment.baseUrl + 'jounreceipteds/';  // URL to web api
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

  getRowsJoUnreceipt(): Observable<Joborders[]> {
    return this.http.get<Joborders[]>(this.urljounreceipt, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRowsJoUnreceipt', []))
    );
  }

  getJOUnreceipt(id: number): Observable<any> {
    return this.http.get<any>(`${this.url2}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<any>('getJOUnreceipt'))
    );
  }

  getJOOD(): Observable<Joborders[]> {
    return this.http.get<Joborders[]>(this.urljood, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getJO(id: number): Observable<Joborders> {
    return this.http.get<Joborders>(this.url + id, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Joborders>('getJO')),
    );
  }

  getJOb(id: number): any {
    return this.http.get(this.url + id, httpOptions)
    // .subscribe(result => console.log(result));
    // .pipe(
    //   catchError(this.logErrorHandle.handleError<Joborders>('getJO')),
    // );
  }

  getJO2(id: number): Observable<Joborders2> {
    return this.http.get<Joborders2>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Joborders2>('getJO'))
    );
  }

  getJOUndlvrd(): Observable<Joborders[]> {
    return this.http.get<Joborders[]>(this.url3, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getJO1(id: number): Observable<Joborders> {
    return this.http.get<Joborders>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Joborders>('getJO1'))
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

  updateForUser (item: Joborders2) {
    return this.http.put<Joborders2>(this.url5 + item.id + '/', item, httpOptions);
  }

  updateForAdmin (item: Joborders2) {
    return this.http.put<Joborders2>(this.urlsendtoAdmin + item.id + '/', item, httpOptions).pipe(
      tap((item: Joborders2) => {
        this.logErrorHandle.log('Job Order', + item.jobOrderNo + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Joborders): Observable<Joborders> {
    return this.http.delete<Joborders>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Job Order', item.id + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Joborders>('delete'))
    );
  }

  postFile(item: Joborders2): Observable<any> {
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
      formData.append('status', 'C'); //formData.append('status', item.status);

      for (let i = 0; i < item['product'].length; i++)
      {
        let x = (i + 1).toString();

        // console.log(item.product);
        formData.append('product' + x, item.product[i]);
        formData.append('qty' + x, item.qty[i].toString());
        formData.append('type' + x, item.type[i]);
        formData.append('price' + x, '0'); //formData.append('price', item.price[i].toString());
        formData.append('markup' + x, '0'); //formData.append('markup', item.markup[i].toString());
        formData.append('fileSource' + x, item.fileSource[i]);
        // formData.append('fileUrl' + x, item.fileUrl[i], item.fileUrl[i].name);
        if (!item.fileUrl[i])
        {
          //formData.append('fileUrl' + x, '', 'null');
        }
        else
        {
          formData.append('fileUrl' + x, item.fileUrl[i], item.fileUrl[i].name);
        }
        formData.append('fileName' + x, item.fileName[i]);
      }
      return this.http
        .post(endpoint, formData);
        // .map(() => {
        //   return true; });
  }

  public getFile(id: number) {
    return this.http.get(this.url4 + id,
    {responseType: 'blob', headers: new HttpHeaders({ 'accept': 'application/pdf' })})
    .map(
      (res) => {
        return new Blob([res], {type: 'application/pdf'})
      });
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
