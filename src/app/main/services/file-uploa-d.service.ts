import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Joborders } from '../models/joborders';
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
export class FileUploaDService {
  private url = environment.baseUrl + 'joborders/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

//   postFile(fileToUpload: File): Observable<File> {
//     const endpoint = this.url;
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.http
//       .post(endpoint, formData, { headers: httpOptions })
//       .map(() => { return true; })
//       .catch((e) => this.handleError(e));
// }

// postFile(fileToUpload: File): Observable<File> {
//   const endpoint = this.url;
//   const formData: FormData = new FormData();
//   formData.append('fileKey', fileToUpload, fileToUpload.name);
//      return this.http
//       .post(endpoint, formData, httpOptions)
//       .map(() => { return true; })
//       .catch(this.handleError('post'));
// }

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
    switch(type) {
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
