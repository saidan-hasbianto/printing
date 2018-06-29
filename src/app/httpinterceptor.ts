import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {SessionStorageService, SessionStorage} from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    public token: string;
    constructor(
      private router: Router,
        private storage: SessionStorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('intercepted request ... ');

        // Clone the request to add the new header
        // const currentUser = JSON.parse(this.storage.retrieve('currentUser'));
        // this.token = currentUser && currentUser.token;

        this.token = localStorage.getItem('token');
        let newReq;
        if (this.token){
            const tokenStr = 'Token ' + this.token;
            newReq = req.clone({ headers: req.headers.set('Authorization', tokenStr)});
            // console.log(tokenStr);
        }

        // console.log('Sending request with new header now ...');

        // send the newly created request
        return next.handle(newReq ? newReq : req)
            .catch((error, caught) => {
            // intercept the respons error and displace it to the console
                console.log('Error Occurred');
                console.log(error);
                if (error instanceof HttpErrorResponse)
                {
                  if (error.status === 403 || error.status === 401)
                  {
                    if (this.router.url !== '/login') {
                      this.router.navigate(['login']);
                    }
                  }
                  else if (error.status === 0) {
                    return Observable.throw('Cannot comunicate with server.');
                    // this.toastr.error("Cannot comunicate with server.", "ERROR");
                  }
                  // else if (error.status === 500) {
                  //   return Observable.throw('Error on the server.');
                  //     //this.toastr.error("Error on the server.", "ERROR");
                  // }
                }
                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
