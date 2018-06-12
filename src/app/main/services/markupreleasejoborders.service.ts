import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from './log-error-handle.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Markupreleasejoborders } from '../models/markupreleasejoborders';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class MarkupreleasejobordersService {
  private url = environment.baseUrl + 'markupreleasejoborders/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Markupreleasejoborders[]> {
    return this.http.get<Markupreleasejoborders[]>(this.url, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getPrice(id: number): Observable<Markupreleasejoborders> {
    return this.http.get<Markupreleasejoborders>(`${this.url}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Markupreleasejoborders>('getPrice'))
    );
  }

    /** POST: add a new hero to the server */
  add (price: Markupreleasejoborders): Observable<Markupreleasejoborders> {
    return this.http.post<Markupreleasejoborders>(this.url, price, httpOptions).pipe(
      tap((price: Markupreleasejoborders) => this.logErrorHandle.log('Price ID =', + price.id + ' successfully added', 0)),
      catchError(this.logErrorHandle.handleError<Markupreleasejoborders>('add'))
    );
  }

  update (price: Markupreleasejoborders) {
    return this.http.put<Markupreleasejoborders>(this.url + price.id + '/', price, httpOptions).pipe(
      tap((price: Markupreleasejoborders) => {
        this.logErrorHandle.log('Job Order', + price.id + ' successfully updated', 0);
      }),
      catchError(this.logErrorHandle.handleError<Markupreleasejoborders>('update'))
    );
  }

  delete (price: Markupreleasejoborders | number): Observable<Markupreleasejoborders> {
    const id = typeof price === 'number' ? price : price.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<Markupreleasejoborders>(url, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Job Order', +'${id}' + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Markupreleasejoborders>('delete'))
    );
  }
}
