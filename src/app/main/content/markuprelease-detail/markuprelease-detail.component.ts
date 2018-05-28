import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { ReceiptingListService } from '../../services/receipting-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Mscustomer } from '../../models/mscustomergroup';
import { MarkupreleasejobordersComponent } from '../markupreleasejoborders/markupreleasejoborders.component';
import { Markupreleasejoborders } from '../../models/markupreleasejoborders';
import { Markupreleases, Markupreleases2, MarkupreleaseDtls } from '../../models/markupreleases';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { MarkupreleasesService } from '../../services/markupreleases.service';
import { ReceiptJobOrdersComponent } from '../receipt-job-orders/receipt-job-orders.component';
import { Joborders } from '../../models/joborders';
import { MarkupreleasejobordersService } from '../../services/markupreleasejoborders.service';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { ngModuleJitUrl } from '@angular/compiler';

@Component({
  selector: 'fuse-markuprelease-detail',
  templateUrl: './markuprelease-detail.component.html',
  styleUrls: ['./markuprelease-detail.component.scss']
})
export class MarkupreleaseDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  custOption: Mscustomer[] = [];
  sub: any;
  editing = {};
  selected = [];
  loadingbar= true;
  jo: Joborders[];
  jotmp: Joborders[] = [];
  mujo: Markupreleasejoborders[] = [];
  murelease2: Markupreleases2;
  murelease: Markupreleases = { id: 0, markupNo : null, markupReleaseJobOrders : null, releaseDate : '', remarks : '', customer : null, payTo : '' };
  constructor(
    private musvc: MarkupreleasesService,
    private mujosvc: MarkupreleasejobordersService,
    private custsvc: MscustomergroupService,
    private toastrSvc: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private dialog: MatDialog
  ) {
    this.formErrors = {
      // markupReleaseJobOrders : {},
      customer : {},
      markupNo : {},
      releaseDate : {},
      payTo : {}
      };
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id : [''],
      markupNo  : ['', Validators.required],
      releaseDate  : ['', Validators.required],
      remarks  : [''],
      payTo  : ['', Validators.required],
      customer  : ['', Validators.required]
    });

    this.custsvc.getRows().subscribe(res => this.custOption = res);

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.musvc.getItem(id)
        .subscribe(res => {
          this.murelease2 = res;

          this.form.setValue({
            id: this.murelease2.id,

            markupNo: this.murelease2.markupNo,
            releaseDate: this.murelease2.releaseDate,
            remarks: this.murelease2.remarks,
            customer: this.murelease2.customer,
            payTo: this.murelease2.payTo
          });

          const arr = [];
            let i;
            for (i = 0; i < res.markupReleaseJobOrders.length; i++)
            {
              res.markupReleaseJobOrders[i].jobOrder_data.receipt = this.murelease2.markupReleaseJobOrders[i].amount; // res.markupReleaseJobOrders[i].amount;
              arr.push(res.markupReleaseJobOrders[i].jobOrder_data);
            }
            this.jo = arr;
          this.loadingbar = false;
      });
    }});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
    this.loadingbar = false;
    // console.log(this.form);
  }

  addDetail() {
    const dialogRef = this.dialog.open(ReceiptJobOrdersComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.jo = result;
      let i;
      for (i = 0; i < result.length; i++)
      {
        this.jo[i].receipt = 0;

      }
      // this.jo.push(result[0]);

    });
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name, controls[name].status);
        }
    }
    console.log(invalid);
    return invalid;
  }

  onSubmit(mu: Markupreleases2)
  {
    // this.findInvalidControls();

    if (this.form.valid === true)
    {
      const datestring = mu.releaseDate;
      const newDate = new Date(datestring);
      mu.releaseDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

      if (this.jo.length > 0)
      {
        console.log(this.jo);

        let i;
        for (i = 0; i < this.jo.length; i++)
        {
          this.mujo['amount'] = this.jo['amount'];
          this.mujo['jobOrder'] = this.jo;
        }
        // mu.markupReleaseJobOrders = this.mujo;

        console.log(mu);
        console.log(this.mujo);
      }
      else
      {
        alert('Please Add Job Order');
      }

      if (mu.id === '')
      {
        mu.id = '0';

        this.musvc.add(mu).subscribe(
          success => {
            this.goback();
          },
          error => {
            // console.log(error.error);
            this.toastrSvc.error(error.error.error_message, 'Error');
          }
        );
        // this.goback();
      }
      else
      {
        this.musvc.update(mu).subscribe(
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

  newOnSubmit(mu: Markupreleases2)
  {
    if (this.form.valid === true)
    {
      if (mu.id === '')
      {
        if (this.jo.length > 0)
        {
          const datestring = mu.releaseDate;
          const newDate = new Date(datestring);
          mu.releaseDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

          const _Markupreleases2 = new Markupreleases2();
          let _MarkupreleaseDtls: MarkupreleaseDtls;
          _Markupreleases2.id = '0';
          _Markupreleases2.releaseDate = mu.releaseDate;
          _Markupreleases2.markupNo = mu.markupNo;
          _Markupreleases2.remarks = mu.remarks;
          _Markupreleases2.customer = mu.customer;
          _Markupreleases2.payTo = mu.payTo;
          for (let i = 0; i < this.jo.length; i++)
          {
            _MarkupreleaseDtls = new MarkupreleaseDtls();
            _MarkupreleaseDtls.amount = this.jo[i].receipt;
            _MarkupreleaseDtls.jobOrder = this.jo[i].id;
            _Markupreleases2.markupReleaseJobOrders.push(_MarkupreleaseDtls);
          }

          this.musvc.add(_Markupreleases2).subscribe(
            success => {
              this.goback();
            },
            error => {
              // console.log(error.error);
              this.toastrSvc.error(error.error.error_message, 'Error');
            }
          );
        }
        else{
          alert('Please fill Markup Job Order');
        }
      }
      else{
        const datestring = mu.releaseDate;
        const newDate = new Date(datestring);
        mu.releaseDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

        const _Markupreleases2 = new Markupreleases2();
        let _MarkupreleaseDtls: MarkupreleaseDtls;
        _Markupreleases2.id = mu.id;
        _Markupreleases2.releaseDate = mu.releaseDate;
        _Markupreleases2.markupNo = mu.markupNo;
        _Markupreleases2.remarks = mu.remarks;
        _Markupreleases2.customer = mu.customer;
        _Markupreleases2.payTo = mu.payTo;
        for (let i = 0; i < this.jo.length; i++)
        {
          _MarkupreleaseDtls = new MarkupreleaseDtls();
          _MarkupreleaseDtls.amount = this.jo[i].receipt;
          _MarkupreleaseDtls.jobOrder = this.jo[i].id;
          _Markupreleases2.markupReleaseJobOrders.push(_MarkupreleaseDtls);
        }
        console.log(_Markupreleases2);
        this.musvc.update(_Markupreleases2).subscribe(
          success => {
            this.goback();
          },
          error => {
            // console.log(error.error);
            this.toastrSvc.error(error.error.error_message, 'Error');
          }
        );
      }
    }
  }

  deleteJo(markupjo: Markupreleasejoborders): void {
    if (this.mujo.length > 0)
    {
      if (confirm('Are you sure want to delete?')) {
        this.mujo.splice(this.mujo.indexOf(markupjo), 1);
    }
    }
  }

  //  editJo(msitem: Markupreleasejoborders) {
  //   const dialogRef = this.dialog.open(MarkupreleasejobordersComponent,
  //     {
  //       data: msitem
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(res => {
  //     let idx = this.murelease.markupReleaseJobOrders.indexOf(msitem);

  //     for (var prop in this.murelease.markupReleaseJobOrders[idx]) {
  //       this.murelease.markupReleaseJobOrders[idx][prop] = res[prop];
  //     }
  //   });
  // }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.jo[rowIndex][cell] = event.target.value;
    this.jo = [...this.jo];
    console.log('UPDATED!', this.jo[rowIndex][cell]);
    console.log(this.jo);
  }
}
