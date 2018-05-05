import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msmarketing } from '../../models/msmarketing';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { MsitemService } from '../../services/msitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MsmarketingService } from '../../services/msmarketing.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-msmarketing-detail',
  templateUrl: './msmarketing-detail.component.html',
  styleUrls: ['./msmarketing-detail.component.scss']
})
export class MsmarketingDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  item: Msmarketing = { id: 0, marketingCd: '', name : '', address : '', contactNumber : 0, commission : 0 };
  sub: any;
  loadingbar = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mktservice: MsmarketingService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService
  ) {
    this.formErrors = {
      marketingCd : {},
      address : {},
        name : {},
        contactNumber : {},
        commission : {}
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.item.id],
      marketingCd  : [this.item.marketingCd, Validators.required],
      name  : [this.item.name, Validators.required],
      address : [this.item.address, Validators.required],
      contactNumber  : [this.item.contactNumber, Validators.required],
      commission  : [this.item.commission, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.mktservice.getMarketing(id)
        .subscribe(res => {
          this.item = res;

        this.form.setValue({
          id: this.item.id,
          marketingCd: this.item.marketingCd,
          name: this.item.name,
          address: this.item.address,
          contactNumber: this.item.contactNumber,
          commission: this.item.commission
      });
    this.loadingbar = false;
  });
}});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(item: Msmarketing) {
    if (this.form.valid) {
      if (item.id === 0) {
        this.loadingbar = false;
        // this.itemservice.add(item).subscribe(res => { this.loadingbar = false; });
        this.mktservice.add(item).subscribe(
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
        this.mktservice.update(item).subscribe(
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
