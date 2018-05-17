import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { LogErrorHandleService } from './log-error-handle.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { ReceiptingList, Receipting, ReceiptingDtls } from '../models/receipting-list';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class ReceiptingListService {
  private url = environment.baseUrl + 'receipts/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Receipting[]> {
    return this.http.get<Receipting[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getReceipt(id: number): Observable<Receipting> {
    return this.http.get<Receipting>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Receipting>('getReceipt'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Receipting): Observable<Receipting> {
    return this.http.post<Receipting>(this.url, item, httpOptions).pipe(
      tap((item: Receipting) => {
        this.logErrorHandle.log('Receipt ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Receipting) {
    return this.http.put<Receipting>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Receipting) => {
        this.logErrorHandle.log('Receipting No =', + item.receiptNo + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Receipting): Observable<Receipting> {
    return this.http.delete<Receipting>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Receipting', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Receipting>('delete'))
    );
  }
}
