import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vendor } from '../models/vendor';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class VendorService {
  private url = environment.baseUrl + 'vendors/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getSingleVendor(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Vendor>('getReceipt'))
    );
  }

    /** POST: add a new hero to the server */
    add (item: Vendor): Observable<Vendor> {
      return this.http.post<Vendor>(this.url, item, httpOptions).pipe(
        tap((item: Vendor) => {
          this.logErrorHandle.log('Vendor', + item.id + ' successfully added', 0);
        }),
      );
    }

  update (item: Vendor) {
    return this.http.put<Vendor>(this.url + item.id + '/', item, httpOptions).pipe(
      tap((item: Vendor) => {
        this.logErrorHandle.log('Vendor', + item.id + ' successfully updated', 0);
      }),
    );
  }

  delete (item: Vendor): Observable<Vendor> {
    return this.http.delete<Vendor>(`${this.url}${item.id}/`, httpOptions).pipe(
    tap(_ => this.logErrorHandle.log('Vendor', item + ' successfully deleted', 0)),
    catchError(this.logErrorHandle.handleError<Vendor>('delete'))
    );
  }
}
