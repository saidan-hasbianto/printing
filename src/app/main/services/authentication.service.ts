import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {SessionStorageService, SessionStorage} from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new Headers(
    {
      'Content-Type': 'application/json'
    }
  ),
};

@Injectable()
export class AuthenticationService {
    public token: string;
    public userid: string;
    public username: string;
    public group: string;
    public groupname: string;
    public firstname: string;
    public lastname: string;
    public email: string;

    constructor(
      private http: Http,
      private storage: SessionStorageService,
      private toastr: ToastrService
    ) {
        // set token if saved in local storage
        const currentUser = JSON.parse(this.storage.retrieve('currentUser'));
        this.token = currentUser && currentUser.token;
        // const currentUser2 = JSON.parse(this.storage.retrieve(''));
        // this.userid = currentUser && currentUser.user.id;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(environment.baseUrl + 'api-token-auth/', JSON.stringify({ username: username, password: password }), httpOptions)
        .timeout(4000)
        .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                const id = response.json() && response.json().user.id;
                const uname = response.json() && response.json().user.username;
                const tipe = response.json() && response.json().user.groups;
                const tipe2 = response.json() && response.json().user.userGroups[0].name;
                const fname = response.json() && response.json().user.first_name;
                const lname = response.json() && response.json().user.last_name;
                const mail = response.json() && response.json().user.email;
                if (token) {
                    // set token property
                    this.token = token;
                    this.userid = id;
                    this.username = uname;
                    this.group = tipe;
                    this.groupname = tipe2;
                    this.email = mail;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.store('currentUser', JSON.stringify({ username: username, token: token, userid: id, group: tipe, email: mail  }));
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('userid', this.userid);
                    localStorage.setItem('username', this.username);
                    localStorage.setItem('group', this.group);
                    localStorage.setItem('groupname', this.groupname);
                    localStorage.setItem('email', this.email);

                    console.log(this.storage);
                    console.log(localStorage);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error, caught) => {
                  // return the error to the method that called it
                  // if (error.status && error.status === 400)
                  // {
                  //   this.toastr.error('Username or password is incorrect', 'Login Failed!');
                  // }
                  // if (error.status && error.status === 408)
                  // {
                  //   this.toastr.error('Request Time Out - Cannot comunicate with server', 'Login Failed!');
                  // }
                  // if (error.status && error.status === 404)
                  // {
                  //   this.toastr.error('Server Not Found', 'Login Failed!');
                  // }


                  if (error.status === 400)
                  {
                    this.toastr.error('Username or password is incorrect', 'Login Failed!');
                  }
                  if (error.name === 'TimeoutError')
                  {
                    this.toastr.error('Request Time Out - Cannot comunicate with server', 'Login Failed!');
                  }
                  if (error.status === 0)
                  {
                    this.toastr.error('Server Not Found', 'Login Failed!');
                  }
                  return Observable.throw(error);
                }) as any;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.storage.clear('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('group');
        localStorage.removeItem('groupname');
        localStorage.removeItem('email');
        console.log(localStorage);
    }

    public isAuthenticated(): boolean {
      return this.token ? true : false;
    }

    public isAdmin(): boolean {
      const admin = localStorage.getItem('groupname');
      if (admin === 'Group Admin')
      {
        return true;
      }
      return false;
    }

    public isUser(): boolean {
      const groupname = localStorage.getItem('groupname');
      if (groupname === 'Group User' || groupname === 'Group Admin')
      {
        return true;
      }
      return false;
    }

    public isOperator(): boolean {
      const groupname = localStorage.getItem('groupname');
      if (groupname === 'Group Operator')
      {
        return true;
      }
      return false;
    }
}
