import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '../../models/vendor';
import { MatDialog } from '@angular/material';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { PaymPurchListService } from '../../services/paym-purch-list.service';
import { VendorService } from '../../services/vendor.service';
import { Msactivity } from '../../models/msactivity';
import { MsactivityService } from '../../services/msactivity.service';
import { PaymPurchList, PaymPurchDtls } from '../../models/paym-purch-list';
import { PurchItem } from '../../models/purch-item';
import { PaymPurchFormComponent } from '../paym-purch-form/paym-purch-form.component';

@Component({
  selector: 'app-paym-purch-list-detail',
  templateUrl: './paym-purch-list-detail.component.html',
  styleUrls: ['./paym-purch-list-detail.component.scss']
})
export class PaymPurchListDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  vendOption: Vendor[] = [];
  activityCdOption: Msactivity[] = [];
  sub: any;
  editing = {};
  selected = [];
  loadingbar= true;
  _PaymPurchList: PaymPurchList;
  _PaymPurchDtls: PaymPurchDtls[];
  constructor(
    private toastrSvc: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private dialog: MatDialog,
    private paympurchsvc: PaymPurchListService,
    private vendsvc: VendorService,
    private activitysvc: MsactivityService
  ) {
    this.formErrors = {
      payNo : {},
      payDate : {},
      vendor : {},
      // , remarks : {},
      activityCd : {}
      };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id : 0,
      payNo  : ['', Validators.required],
      payDate  : ['', Validators.required],
      // remarks  : [''],
      vendor  : ['', Validators.required],
      activityCd : ['', Validators.required]
    });

    this.vendsvc.getRows().subscribe(res => this.vendOption = res);
    this.activitysvc.getRows().subscribe(res => this.activityCdOption = res);

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.paympurchsvc.getSingle(id)
        .subscribe(res => {
          this._PaymPurchList = res;

          this.form.setValue({
            id: this._PaymPurchList.id,
            payNo: this._PaymPurchList.payNo,
            payDate: this._PaymPurchList.payDate,
            // remarks: this._PaymPurchList.remarks,
            vendor: this._PaymPurchList.vendor,
            activityCd: this._PaymPurchList.activityCd
          });

          const arr = [];
            let i;
            for (i = 0; i < res.paymentDtls.length; i++)
            {
              // res.paymentDtls[i].amount =
              arr.push(res.paymentDtls[i]);
            }
            this._PaymPurchDtls = arr;
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
    // this._location.back();
    this._location.prepareExternalUrl('/paym-purch-list');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteDtls(dtls: PaymPurchDtls): void {
    if (this._PaymPurchDtls.length > 0)
    {
      if (confirm('Are you sure want to delete?')) {
        this._PaymPurchDtls.splice(this._PaymPurchDtls.indexOf(dtls), 1);
    }
    }
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this._PaymPurchDtls[rowIndex][cell] = event.target.value;
    this._PaymPurchDtls = [...this._PaymPurchDtls];
    console.log('UPDATED!', this._PaymPurchDtls[rowIndex][cell]);
    console.log(this._PaymPurchDtls);
  }

  addDtls() {
    const dialogRef = this.dialog.open(PaymPurchFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this._PaymPurchDtls = result;
      let i;
      for (i = 0; i < result.length; i++)
      {
        // this._PaymPurchDtls.push(result[i]);
        this._PaymPurchDtls[i].amount = 0;
        console.log(this._PaymPurchDtls[i]);
      }
    });
  }

  onSubmit(ppl: PaymPurchList)
  {
    if (this.form.valid === true)
    {
      const datestring = ppl.payDate;
      const newDate = new Date(datestring);
      ppl.payDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

      if (this._PaymPurchDtls.length > 0)
      {
        this._PaymPurchList.paymentDtls = this._PaymPurchDtls;
      }
      else
      {
        alert('Please Add Payment Item');
      }
    }

    if (ppl.id === 0)
    {
      this.paympurchsvc.add(ppl).subscribe(
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
      this.paympurchsvc.update(ppl).subscribe(
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
