import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msitem } from '../../models/msitem';
import { ActivatedRoute, Router } from '@angular/router';
import { MsitemService } from '../../services/msitem.service';
import { Location } from '@angular/common';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-msitem-detail',
  templateUrl: './msitem-detail.component.html',
  styleUrls: ['./msitem-detail.component.scss']
})
export class MsitemDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  item: Msitem = { id: 0, itemCd : '', name : '', descs : '', minQty : 0 };
  sub: any;
  loadingbar = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemservice: MsitemService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService
  ) {
    this.formErrors = {
      itemCd : {},
        name : {},
        descs : {},
        minQty : {}
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.item.id],
      itemCd : [this.item.itemCd, Validators.required],
      name  : [this.item.name, Validators.required],
      descs  : [this.item.descs, Validators.required],
      minQty  : [this.item.minQty, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.itemservice.getItem(id)
        .subscribe(res => {
          this.item = res;

        this.form.setValue({
          id: this.item.id,
          itemCd: this.item.itemCd,
          name: this.item.name,
          descs: this.item.descs,
          minQty: this.item.minQty
      });
    this.loadingbar = false;
  });
}});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(item: Msitem) {
    if (this.form.valid) {
      if (item.id === 0) {
        this.loadingbar = false;
        // this.itemservice.add(item).subscribe(res => { this.loadingbar = false; });
        this.itemservice.add(item).subscribe(
          success => {
            this.goback();
          },
          error => {
            console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          }
        );
        // this.goback();
      } else {
        // this.itemservice.update(item).subscribe(res => { this.loadingbar = false; });
        this.itemservice.update(item).subscribe(
           success =>
           {
             this.goback();
           },
          error =>
          {
            console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          }
        );
      }
    }
  }

  onFormValuesChanged()
  {
      for ( const field in this.formErrors )
      {
          if ( !this.formErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.formErrors[field] = {};

          // Get the control
          const control = this.form.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.formErrors[field] = control.errors;
          }
      }
  }

  goback() {
    this._location.back();
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log('Error', `${operation} failed: ${error.error.error_message}`, 3);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RwService message with the MessageService */
  log( title: string, message: string, type: number) {
    switch (type) {
      case 0: {
        this.toastr.success(message, title);
        break;
      }
      case 1: {
        this.toastr.info(message, title);
        break;
      }
      case 2: {
        this.toastr.warning(message, title);
        break;
      }
      case 3: {
        this.toastr.error(message, title);
        break;
      }
      default : {
        break;
      }
    }
  }
}
