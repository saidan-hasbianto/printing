import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CashbookService } from '../../services/cashbook.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MsactivityService } from '../../services/msactivity.service';
import { Msactivity } from '../../models/msactivity';
import { Cashbook } from '../../models/cashbook';
import { Location } from '@angular/common';

@Component({
  selector: 'fuse-cashbook-detail',
  templateUrl: './cashbook-detail.component.html',
  styleUrls: ['./cashbook-detail.component.scss']
})
export class CashbookDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  sub: any;
  editing = {};
  selected = [];
  loadingbar= true;
  actOption: Msactivity[];
  cb: Cashbook;
  trxOption = [
    {value: 'D', display_name: 'Debit'},
    {value: 'C', display_name: 'Credit'}
  ];
  constructor(
    private cbsvc: CashbookService,
    private toastrSvc: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private dialog: MatDialog,
    private actsvc: MsactivityService
  ) {
    this.formErrors = {
      docNo : {},
      trxDate : {},
      docDate : {},
      trxMode : {},
      descs : {},
      docAmt : {},
      refNo : {},
      activity : {}
      };
  }

  ngOnInit() {
    this.actsvc.getRows().subscribe(res => this.actOption = res);

    this.form = this.formBuilder.group({
      id : 0,
      docNo : ['', Validators.required],
      trxDate  : ['', Validators.required],
      docDate  : ['', Validators.required],
      trxMode  : ['', Validators.required],
      descs  : ['', Validators.required],
      docAmt  : ['', Validators.required],
      refNo  : ['', Validators.required],
      activity  : ['', Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.cbsvc.getItem(id)
        .subscribe(res => {
          this.cb = res;

          this.form.setValue({
            id: this.cb.id,
            docNo : this.cb.docNo,
            trxDate  : this.cb.trxDate,
            docDate  : this.cb.docDate,
            trxMode  : this.cb.trxMode,
            descs  : this.cb.descs,
            docAmt  : this.cb.docAmt,
            refNo  : this.cb.refNo,
            activity  : this.cb.activity,
          });
          this.loadingbar = false;
      });
    }});
    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
    this.loadingbar = false;
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
    // this._location.prepareExternalUrl('/markupreleases');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(cb: Cashbook)
  {
    if (this.form.valid === true)
    {
      const newDate = new Date(cb.trxDate);
      cb.trxDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

      const newDate2 = new Date(cb.docDate);
      cb.docDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

      if (cb.id === 0)
      {
        console.log(cb);
        this.cbsvc.add(cb).subscribe(
          success => {
            this.goback();
          },
          error => {
            // console.log(error.error);
            this.toastrSvc.error(error.error.error_message, 'Error');
          }
        );
      }
      else
      {
        this.cbsvc.update(cb).subscribe(
          success => {
            this.goback();
          },
          error => {
            console.log(error.error);
            this.toastrSvc.error(error.error.error_message, 'Error');
          }
        );
      }
    }
  }
}
