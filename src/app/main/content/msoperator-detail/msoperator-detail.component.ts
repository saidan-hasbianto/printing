import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msoperator } from '../../models/msoperator';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MsoperatorService } from '../../services/msoperator.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-msoperator-detail',
  templateUrl: './msoperator-detail.component.html',
  styleUrls: ['./msoperator-detail.component.scss']
})
export class MsoperatorDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  item: Msoperator = { id: 0, operatorCd: '', name : '' };
  sub: any;
  loadingbar = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private opsservice: MsoperatorService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService
  ) {
    this.formErrors = {
      operatorCd : {},
        name : {}
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.item.id],
      operatorCd  : [this.item.operatorCd, Validators.required],
      name  : [this.item.name, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.opsservice.getItem(id)
        .subscribe(res => {
          this.item = res;

        this.form.setValue({
          id: this.item.id,
          operatorCd: this.item.operatorCd,
          name: this.item.name
          });
          this.loadingbar = false;
          });
        }});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(item: Msoperator) {
    if (this.form.valid) {
      if (item.id === 0) {
        this.loadingbar = false;
        // this.itemservice.add(item).subscribe(res => { this.loadingbar = false; });
        this.opsservice.add(item).subscribe(
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
        this.opsservice.update(item).subscribe(
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
