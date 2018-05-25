import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LogErrorHandleService } from './log-error-handle.service';
import { catchError, tap } from 'rxjs/operators';
import { Deliveryorder } from '../models/deliveryorder';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class DeliveryorderService {
  private url = environment.baseUrl + 'deliveryorders/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Deliveryorder[]> {
    return this.http.get<Deliveryorder[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getDO(id: number): Observable<Deliveryorder> {
    return this.http.get<Deliveryorder>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Deliveryorder>('getItem'))
    );
  }

    /** POST: add a new hero to the server */
  add (item: Deliveryorder): Observable<Deliveryorder> {
    return this.http.post<Deliveryorder>(this.url, item, httpOptions).pipe(
      tap((item: Deliveryorder) => {
        this.logErrorHandle.log('Item ID =', + item.id + ' successfully added', 0);
      }),
    );
  }

  update (item: Deliveryorder) {
    return this.http.put<Deliveryorder>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Deliveryorder) => {
        this.logErrorHandle.log('Updated Item Code =', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Deliveryorder): Observable<Deliveryorder> {
    return this.http.delete<Deliveryorder>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Deliveryorder', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Deliveryorder>('delete'))
    );
  }
}
