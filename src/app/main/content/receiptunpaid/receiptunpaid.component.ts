import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JobordersService } from '../../services/joborders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentreceiptsService } from '../../services/paymentreceipts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paymentreceipts } from '../../models/paymentreceipts';
import { Location, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-receiptunpaid',
  templateUrl: './receiptunpaid.component.html',
  styleUrls: ['./receiptunpaid.component.scss']
})
export class ReceiptunpaidComponent implements OnInit {
  rows = [];
  selected = [];    
  loadingIndicator = true;  
  form: FormGroup;
  formErrors: any;  
  id: number;
  selectedData: Paymentreceipts[] = [];
  paymreceipt: Paymentreceipts[];

  constructor(    
    private _location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paymreceiptsvc: PaymentreceiptsService,
    private currpipe: CurrencyPipe,
    private dialogRef: MatDialogRef<ReceiptunpaidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    if (data) {
      this.id = data;
    }
  }

  ngOnInit() {
    console.log(this.id['data']);
    this.getRows(this.id['data']);
  }

  getRows(id: number): void {
    this.loadingIndicator = true;
    this.paymreceiptsvc.getReceiptbyCust(id)
      .subscribe(rows => {
        this.paymreceipt = rows;
        //console.log(this.paymreceipt);
        for(let i=0;i<this.paymreceipt.length;i++)
        {
          this.paymreceipt[i].remainsStr = this.currpipe.transform(this.paymreceipt[i].remains, 'IDR');
        }
        
        //console.log(this.paymreceipt);

        this.loadingIndicator = false;
      });
  }

  onSelect({ selected }) {
    // console.log(this.selected);
    this.selectedData.push(selected);
  }

  onActivate(event) {
    console.log('Event: activate', event);
  }

  goback() {
    this._location.back();
  }

  onSubmit(obj: Paymentreceipts) {
    this.dialogRef.close(obj);
  }

  onCheckboxChange(event) {
    if (this.form.get(event.target.id).value) {
        this.form.patchValue({[event.target.id] : event.target.id});
    }
  }

  // isAllSelected() {
  //   const numSelected = this.selectedData.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected == numRows;
  // }



  add() {
    this.dialogRef.close(this.selected);
  }

}
