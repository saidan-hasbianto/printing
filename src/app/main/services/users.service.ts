import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Users } from '../models/users';
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
export class UsersService {
  private urluser = environment.baseUrl + 'users/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private logErrorHandle: LogErrorHandleService
  ) { }

  getRows(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urluser, httpOptions)
    .pipe(
      catchError(this.logErrorHandle.handleError('getRows', []))
    );
  }

  getUser(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.urluser}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Users>('getUser'))
    );
  }

    /** POST: add a new hero to the server */
    add (user: Users): Observable<Users> {
      return this.http.post<Users>(this.urluser, user, httpOptions).pipe(
        tap((user: Users) => {
          this.logErrorHandle.log('User =', + user.username + ' successfully added', 0);
        }),
      );
    }

    update (user: Users) {
      return this.http.put<Users>(this.urluser, user, httpOptions).pipe(
        tap((user: Users) => {
          this.logErrorHandle.log('Updated User =', + user.username + ' successfully updated', 0);
        }),
      );
    }

    delete (user: Users | number): Observable<Users> {
      // const id = typeof user === 'number' ? user : user.id;
      // const url = `${this.urluser}${id}/`;
      const url = `${this.urluser}/`;

      return this.http.delete<Users>(url, httpOptions).pipe(
        tap(_ => this.logErrorHandle.log('User =', +'${username}' + ' successfully deleted', 0)),
        catchError(this.logErrorHandle.handleError<Users>('delete'))
      );
    }

    // getrowdetail():

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
          this.toastr.success('UsersService: ' + message, 'Users');
          break;
        }
        case 1: {
          this.toastr.info('UsersService: ' + message, 'Users');
          break;
        }
        case 2: {
          this.toastr.warning('UsersService: ' + message, 'Users');
          break;
        }
        case 3: {
          this.toastr.error('UsersService: ' + message, 'Users');
          break;
        }
        default : {
          break;
        }
      }
    }
}
