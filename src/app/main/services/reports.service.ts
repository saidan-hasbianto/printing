import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from './log-error-handle.service';
import { environment } from '../../../environments/environment';
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

@Injectable()
export class ReportsService {
  private url = environment.baseUrl + 'reports/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(id: number): Observable<any> {
    return this.http.get<any>(this.url + id, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<any>('getJO'))
    );
  }

  public getFile(id: number) {
    return this.http.get(this.url + id,
    {responseType: 'blob', headers: new HttpHeaders({ 'accept': 'application/pdf' })})
    .map(
      (res) => {
        return new Blob([res], {type: 'application/pdf'})
      });
  }
}


