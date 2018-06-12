import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { ToastrService } from 'ngx-toastr';
import { ProductItemMaterial } from '../models/product-item-material';
import { tap, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class ProductItemMaterialService {
  private urlProd = environment.baseUrl + 'products/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private logErrorHandle: LogErrorHandleService
  ) { }

  update (prod: ProductItemMaterial) {
    return this.http.put<ProductItemMaterial>(this.urlProd + prod.id + '/', prod, httpOptions).pipe(
      tap((prod: ProductItemMaterial) => {
        this.logErrorHandle.log('Updated Product', + prod.id + ' successfully updated', 0);
      }),
      catchError(this.logErrorHandle.handleError<ProductItemMaterial>('update'))
    );
  }
}
