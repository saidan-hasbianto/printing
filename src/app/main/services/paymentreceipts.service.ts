import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LogErrorHandleService } from './log-error-handle.service';
import { Observable } from 'rxjs/Observable';
import { Paymentreceipts } from '../models/paymentreceipts';
import { catchError, tap } from 'rxjs/operators';
import { PaymentreceiptsList } from '../models/paymentreceipts-list';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }
  )
};

@Injectable()
export class PaymentreceiptsService {
  private urlCust = environment.baseUrl + 'receiptunpaidbycustomer/?customer=';  // URL to web api
  private url = environment.baseUrl + 'paymentreceipts/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Paymentreceipts[]> {
    return this.http.get<Paymentreceipts[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getRowsID(id: number): Observable<PaymentreceiptsList> {
    return this.http.get<PaymentreceiptsList>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<PaymentreceiptsList>('getRowsID'))
    );
  }

  getReceiptbyCust(id: number): Observable<Paymentreceipts[]> {
    return this.http.get<Paymentreceipts[]>(this.urlCust + id, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Paymentreceipts[]>('getReceiptbyCust'))
    );
  }

  delete (obj: Paymentreceipts): Observable<Paymentreceipts> {
    return this.http.delete<Paymentreceipts>(this.url + obj.id, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Payment receipts ', obj.id + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Paymentreceipts>('delete'))
    );
  }

  add (item: PaymentreceiptsList): Observable<PaymentreceiptsList> {
    return this.http.post<PaymentreceiptsList>(this.url, item, httpOptions).pipe(
      tap((item: PaymentreceiptsList) => {
        this.logErrorHandle.log('Payment receipt ', ' successfully added', 0);
      }),
    );
  }

}
