import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Paymentreceipts } from '../../models/paymentreceipts';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { Mscustomer } from '../../models/mscustomergroup';
import { Location, DatePipe, CurrencyPipe } from '@angular/common';
import { ReceiptunpaidComponent } from '../receiptunpaid/receiptunpaid.component';
import { PaymentreceiptsService } from '../../services/paymentreceipts.service';
import { PaymentreceiptsList } from '../../models/paymentreceipts-list';

@Component({
  selector: 'app-paymentreceipt-detail',
  templateUrl: './paymentreceipt-detail.component.html',
  styleUrls: ['./paymentreceipt-detail.component.scss']
})
export class PaymentreceiptDetailComponent implements OnInit {
  today = new Date();
  form: FormGroup;
  formErrors: any;
  type: string;
  editing = {};
  selected = [];
  paymReceipt: Paymentreceipts;
  custOption : Mscustomer[]=[];
  receiptUnpaid : Paymentreceipts;
  cust: Mscustomer;
  sub: any;
  loadingbar= true;
  isVisible = false;
  receiptZero = []; totalUnpaid : number; paymAmount: number; receiptUnpaidOption: Paymentreceipts[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private custsvc: MscustomergroupService,
    private paymreceiptsvc: PaymentreceiptsService,
    private dpipe: DatePipe,
    private currpipe : CurrencyPipe,
  ) { 
    this.formErrors = {
      customer : {},
      // receiptNo : {},
      receiptDate : null
      // remarks : {}
      };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      //id : [''],
      paymentNo  : ['-'], paymentDate  : [this.today, Validators.required],
      remarks  : [''], amount : ['', Validators.required], receipt : ['', Validators.required],
      customer  : ['', Validators.required]
    });
  
    this.custsvc.getRows().subscribe(res => this.custOption = res);
    
    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.paymreceiptsvc.getRowsID(id)
        .subscribe(res =>
          {
            
            let oPaymentreceiptsList = new PaymentreceiptsList();
            oPaymentreceiptsList = res
            this.form.setValue({              
              paymentNo: oPaymentreceiptsList.paymentNo,
              paymentDate: oPaymentreceiptsList.paymentDate,
              remarks: oPaymentreceiptsList.remarks,
              amount: oPaymentreceiptsList.amount,
              receipt: oPaymentreceiptsList.receipt,
              customer: oPaymentreceiptsList.customer
            });
            this.form.get('paymentNo').disable();this.form.get('paymentDate').disable();this.form.get('remarks').disable();
            this.form.get('amount').disable();this.form.get('receipt').disable();this.form.get('customer').disable();
            this.isVisible = false;
          }
        )
      }
    });
  }

  // addreceipting() {
  // //ambil dari receiptunpaidbycustomer 
  // const dialogRef = this.dialog.open(ReceiptunpaidComponent, {
  // width : '50%', height : '80%',
  // data: { type: 'update', data: this.form.controls['customer'].value} });

  // dialogRef.afterClosed().subscribe(result => 
  //   {
  //     console.log(result);
  //     if (!this.receiptUnpaid) // new
  //     {
  //       this.receiptUnpaid = result;
  //       let i;
  //       for (i = 0; i < this.receiptUnpaid.length; i++)
  //       {
  //         //result[i]['amount'] = '0.00';
  //         //this.jo[i].receipt = 0.00;   
  //         this.totalUnpaid = this.receiptUnpaid[i].remains; 
  //       }
        
  //     }
  //     else // update
  //     {
  //       let i;
  //       for (i = 0; i < result.length; i++)
  //       {          
  //         //result[i]['amount'] = '0.00';
  //         this.receiptUnpaid.push(result[i]);
  //         this.totalUnpaid += result[i].remains;
  //       }      
  //     }
  //     // console.log(this.totalUnpaid);
  //     // console.log(this.receiptUnpaid);
  //   });
  // }

  onChooseCust(event) {
    
    this.cust = event;
    this.isVisible = true;
    this.paymreceiptsvc.getReceiptbyCust(event.value).subscribe(res => {
      this.receiptUnpaidOption = res;
      for(let i=0;i<this.receiptUnpaidOption.length;i++)
      {
        this.receiptUnpaidOption[i].remainsStr = this.currpipe.transform(this.receiptUnpaidOption[i].remains, 'IDR');
      }
    });
  }

  // updateValue(event, cell, rowIndex) {
  //   // console.log(this.receiptUnpaid[rowIndex].remains);
  //   // console.log(this.receiptUnpaid[rowIndex][cell]);    
  //   this.editing[rowIndex + '-' + cell] = false;
    
  //   // if (event.target.value < 0 || !event.target.value)
  //   // {
  //   //   this.toastr.error('0.00 not allowed', 'Error Receipt');
  //   //   this.receiptUnpaid[rowIndex][cell] = '0.00';
  //   // }
  //   // else
  //   // {
  //   //   // this.jo[rowIndex][cell] = event.target.value + '.00';
  //   //   this.receiptUnpaid[rowIndex][cell] = event.target.value;
  //   // }
  //   switch (true)
  //   {
  //     case event.target.value <= 0  : this.toastr.error('0.00 not allowed', 'Error Payment'); this.receiptUnpaid[rowIndex][cell] = this.receiptUnpaid[rowIndex].remains; break;
  //     case event.target.value > this.receiptUnpaid[rowIndex].remains : this.toastr.error('Amount over limit Remains', 'Error Payment'); this.receiptUnpaid[rowIndex][cell] = this.receiptUnpaid[rowIndex].remains; break;
  //     default : this.receiptUnpaid[rowIndex][cell] = event.target.value;
  //   }

  //   this.receiptUnpaid = [...this.receiptUnpaid];
  // }

  newOnSubmit(paymreceipt: PaymentreceiptsList)
  {    
    this.receiptZero = [];
    if (this.form.valid === true)
    {
          console.log(paymreceipt);
          const datestring = paymreceipt.paymentDate;
          const newDate = new Date(datestring);

          let oPaymentreceiptsList = new PaymentreceiptsList();
          oPaymentreceiptsList.amount = paymreceipt.amount;
          oPaymentreceiptsList.remarks = paymreceipt.remarks;
          oPaymentreceiptsList.paymentNo = paymreceipt.paymentNo;
          oPaymentreceiptsList.customer = paymreceipt.customer;
          oPaymentreceiptsList.paymentDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
          oPaymentreceiptsList.receipt = this.receiptUnpaid.id;
          
          console.log(oPaymentreceiptsList);
          
          this.paymreceiptsvc.add(oPaymentreceiptsList).subscribe
          (
            success => {
              console.log(success);              
              this.getFile(success.id);
              this.goback()
            },
            error => {
              this.toastr.error(error.message, 'Error');console.log(error);
            }
          );
    }
  }

  goback() {
    this._location.back();
  }

  onChangeAmt(event) {
    // console.log(event.target.value);
    // console.log(this.totalUnpaid);
    // console.log(this.receiptUnpaid);
    
    // if(event.target.value > this.receiptUnpaid.remains)
    // {
    //   this.toastr.error('Payment Amount over Remains limit','Not Allowed');
    //   this.form.patchValue({
    //     amount: this.receiptUnpaid.remains
    //   })
    // }
    // else
    // {
    //   this.paymAmount = event.target.value;
    // }

    switch (true)
    {
      case event.target.value > this.receiptUnpaid.remains : this.toastr.error('Payment Amount over Remains limit','Not Allowed'); this.form.patchValue({amount: this.receiptUnpaid.remains}); break;
      case event.target.value <= 0 : this.toastr.error('0','Not Allowed'); this.form.patchValue({amount: this.receiptUnpaid.remains}); break;
      default : event.target.value; break;
    }
  }

  // deleteJo(obj: Paymentreceipts): void {
  //   if (confirm('Are you sure want to delete?')) {
  //       this.receiptUnpaid.splice(this.receiptUnpaid.indexOf(obj), 1);
  //   }
  // }

  onChooseUnpaid(event) {
    console.log(event);
    this.receiptUnpaid = event.value;
    console.log(this.receiptUnpaid);
  }

  getFile(id: number): void {
    this.paymreceiptsvc.getFile(id)
    .subscribe((res) => {
      const fileURL = URL.createObjectURL(res);
      console.log(fileURL);
      window.open(fileURL);
    },
    error => {
      console.log(error);
    });
  }
}
