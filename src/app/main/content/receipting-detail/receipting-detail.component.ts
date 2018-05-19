import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { ReceiptingList, Receipting, ReceiptingDtls } from '../../models/receipting-list';
import { ReceiptJobOrders } from '../../models/receipt-job-orders';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { ReceiptingListService } from '../../services/receipting-list.service';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Mscustomer } from '../../models/mscustomergroup';
import { JobordersDetailComponent } from '../joborders-detail/joborders-detail.component';
import { ReceiptJobOrdersComponent } from '../receipt-job-orders/receipt-job-orders.component';
import { locale } from '../sample/i18n/tr';
import { forEach } from '@angular/router/src/utils/collection';
import { Jobordertmp } from '../../models/jobordertmp';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { JobordersService } from '../../services/joborders.service';

@Component({
  selector: 'app-receipting-detail',
  templateUrl: './receipting-detail.component.html',
  styleUrls: ['./receipting-detail.component.scss']
})
export class ReceiptingDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  type: string;
  editing = {};
  selected = [];
  lengthreceiptjo: number;
  rjo: any [] = [];

  jo: Joborders[];
  jotmp: Joborders;
  receipt: Receipting;
  receiptDtls: ReceiptingDtls;
  receiptEdit: ReceiptingList[];
  jolist: ReceiptJobOrders[] = [];
  jolisttmp: ReceiptJobOrders;

  custOption: Mscustomer[] = [];
  cust: Mscustomer = {id: 0 , customerCd: null,    name: null,    level: null,    marketing: null,     address: null,
    cp: null,    email: null,     telp: null,    fax: null,    mobile: null,    deliveryAddresses: null };

  sub: any;
  loadingbar= true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private receiptsvc: ReceiptingListService,
    private custsvc: MscustomergroupService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private josvc: JobordersService,
  ) {
    this.formErrors = {

      customer : {},
      receiptNo : {},
      receiptDate : null
      // remarks : {}
      };
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id : [''],
      receiptNo  : ['', Validators.required],
      receiptDate  : ['', Validators.required],
      remarks  : [''],
      customer  : ['', Validators.required]
    });

    this.custsvc.getRows().subscribe(res => this.custOption = res);

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.receiptsvc.getReceipt(id)
        .subscribe(res =>
          {
            this.receipt = res;
            console.log(this.receipt);
            this.form.setValue({
              id: id,
              receiptNo: this.receipt.receiptNo,
              receiptDate: this.receipt.receiptDate,
              remarks: this.receipt.remarks,
              customer: this.receipt.customer
            });

            const arr = [];
            let i;
            for (i = 0; i < res.receiptJobOrders.length; i++)
            {
              res.receiptJobOrders[i].jobOrder_data.receipt = res.receiptJobOrders[i].amount;
              arr.push(res.receiptJobOrders[i].jobOrder_data);
            }

            this.jo = arr;
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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  newOnSubmit(prod: Receipting)
  {
    console.log(prod);
    if (this.form.valid === true)
    {
      if (prod.id === '')
      {
        if (this.jo.length > 0)
        {
          const datestring = prod.receiptDate;
          const newDate = new Date(datestring);
          prod.receiptDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

          const oReceipting = new Receipting();
          let oReceiptingDtls: ReceiptingDtls;
          oReceipting.id = '0';
          oReceipting.receiptDate = prod.receiptDate;
          oReceipting.receiptNo = prod.receiptNo;
          oReceipting.remarks = prod.remarks;
          oReceipting.customer = prod.customer;
          for (let i = 0; i < this.jo.length; i++)
          {
            oReceiptingDtls = new ReceiptingDtls();
            oReceiptingDtls.amount = this.jo[i].receipt;
            oReceiptingDtls.jobOrder = this.jo[i].id;
            oReceipting.receiptJobOrders.push(oReceiptingDtls);
          }
          this.form.value['receiptJobOrders'] = oReceipting;

          this.receiptsvc.add(oReceipting).subscribe
          (
            success =>
            {
              this.goback();
            },
            error =>
            {
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
        }
        else
        {
          alert('Please fill Receipt Job Order');
        }
      }
      else
      {
        const datestring = prod.receiptDate;
        const newDate = new Date(datestring);
        prod.receiptDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

        const oReceipting = new Receipting();
        let oReceiptingDtls: ReceiptingDtls;
        oReceipting.id = prod.id;
        oReceipting.receiptDate = prod.receiptDate;
        oReceipting.receiptNo = prod.receiptNo;
        oReceipting.remarks = prod.remarks;
        oReceipting.customer = prod.customer;
        for (let i = 0; i < this.jo.length; i++)
        {
          oReceiptingDtls = new ReceiptingDtls();
          oReceiptingDtls.amount = this.jo[i].receipt;
          oReceiptingDtls.jobOrder = this.jo[i].id;
          oReceipting.receiptJobOrders.push(oReceiptingDtls);
        }
        this.form.value['receiptJobOrders'] = oReceipting;

        this.receiptsvc.update(oReceipting).subscribe
        (
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

  onSubmit(prod: Receipting) {

      // console.log(this.pricelevel1);
      // prod.receiptJobOrders = this.jolist;
    // this.lengthreceiptjo = this.jolist.length;
    // console.log(prod);
    // console.log(this.lengthreceiptjo);

    const datestring = prod.receiptDate;
      const newDate = new Date(datestring);
      prod.receiptDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();


      // let rjo: ReceiptJobOrders;
      // rjo = {id: null, amount: null, jobOrder: null};
      // for (const job of this.jo)
      // {
      //   const arr = [];
      //   // arr.length = 0;
      //   // console.log(job.id);
      //   console.log(arr);
      //   if (job.id !== arr['id'])
      //   {
      //     arr.push(job);
      //     console.log(arr);
      //     rjo.amount = job.price;
      //     rjo.jobOrder = arr;
      //     this.jolist.push(rjo);
      //   }
      //   // arr.length = 0;
      //   console.log(arr);
      // }


      // const arr2 = [];
      // arr2.length = 0;
      const arr = [];
      arr.length = 0;
      let i;
      for (i = 0; i < this.jo.length; i++)
      {
        // console.log(this.jo[i]);

        // arr.push(job.id, job.price, job);
        // arr.push(this.jo[i]);
        // console.log(arr);

        // rjo.id = job.id;
        // rjo.amount = job.price;
        // console.log(arr);
        // rjo.jobOrder = arr;

        this.jolist['id'] = this.jo[i].id;
        // this.jolist['amount'] = this.jo[i].OrderDetails['price'];
        this.jolist['jobOrder'] = this.jo[i];
        console.log(this.jolist);
        arr.push(this.jolist);
        console.log(arr);

        // console.log(arr2);
      }
      // prod.receiptJobOrders = arr2;

      // console.log(prod);

      this.receiptsvc.add(prod).subscribe(
        success => {
          this.goback();
        },
        error => {
          // console.log(error.error);
          this.toastr.error(error.error.error_message, 'Error');
        }
      );

    // if (this.form.valid === true)  {
    //   let datestring = prod.receiptDate;
    //   let newDate = new Date(datestring);
    //   prod.receiptDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    //   if (this.lengthreceiptjo > 0)
    //   {
    //     prod.receiptJobOrders = this.jolist;
    //   }
    //   else
    //   {
    //     alert('Please fill Receipt Item');
    //   }
    //   if (prod.id === 0)
    //     {
    //       this.receiptsvc.add(prod).subscribe(
    //         success => {
    //           this.goback();
    //         },
    //         error => {
    //           // console.log(error.error);
    //           this.toastr.error(error.error.error_message, 'Error');
    //         }
    //       );
    //       // this.goback();
    //     }
    //     else
    //     {
    //       this.receiptsvc.update(prod).subscribe(
    //         success => {
    //           this.goback();
    //         },
    //         error => {
    //           console.log(error.error);
    //           this.toastr.error(error.error.error_message, 'Error');
    //         }
    //       );
    //       // this.goback();
    //     }

    // }
  }

  deleteJo(receiptItem: Joborders): void {
    if (confirm('Are you sure want to delete?')) {
        this.jo.splice(this.jo.indexOf(receiptItem), 1);
    }
  }

  addreceiptjoborders() {
    const dialogRef = this.dialog.open(ReceiptJobOrdersComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.jo = result;
      console.log(this.jo);
      let i;
      for (i = 0; i < this.jo.length; i++)
      {
        this.jo[i]['receipt'] = 0.00;
      }

    });
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.jo[rowIndex][cell] = event.target.value;
    this.jo = [...this.jo];
    console.log('UPDATED!', this.jo[rowIndex][cell]);
    console.log(this.jo);
  }
}
