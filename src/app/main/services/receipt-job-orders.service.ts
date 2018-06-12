import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from './log-error-handle.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { ReceiptJobOrders } from '../models/receipt-job-orders';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class ReceiptJobOrdersService {
  private url = environment.baseUrl + 'receiptjoborders/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private logErrorHandle: LogErrorHandleService
  ) { }
  getRows(): Observable<ReceiptJobOrders[]> {
    return this.http.get<ReceiptJobOrders[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getPrice(id: number): Observable<ReceiptJobOrders> {
    return this.http.get<ReceiptJobOrders>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<ReceiptJobOrders>('getPrice'))
    );
  }

    /** POST: add a new hero to the server */
  add (price: ReceiptJobOrders): Observable<ReceiptJobOrders> {
    return this.http.post<ReceiptJobOrders>(this.url, price, httpOptions).pipe(
      tap((price: ReceiptJobOrders) => this.logErrorHandle.log('Price ID', + price.id + ' successfully added', 0)),
      catchError(this.logErrorHandle.handleError<ReceiptJobOrders>('add'))
    );
  }

  update (price: ReceiptJobOrders) {
    return this.http.put<ReceiptJobOrders>(this.url + price.id + '/', price, httpOptions).pipe(
      tap((price: ReceiptJobOrders) => {
        this.logErrorHandle.log('Updated Price ID', + price.id + ' successfully updated', 0);
      }),
      catchError(this.logErrorHandle.handleError<ReceiptJobOrders>('update'))
    );
  }

  delete (price: ReceiptJobOrders | number): Observable<ReceiptJobOrders> {
    const id = typeof price === 'number' ? price : price.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<ReceiptJobOrders>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Price', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<ReceiptJobOrders>('delete'))
    );
  }
}
