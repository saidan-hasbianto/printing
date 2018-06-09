import { Component, OnInit, Inject } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { Location } from '@angular/common';
import { JobordersService } from '../../services/joborders.service';
import { ReceiptJobOrders } from '../../models/receipt-job-orders';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'fuse-receipt-job-orders',
  templateUrl: './receipt-job-orders.component.html',
  styleUrls: ['./receipt-job-orders.component.scss']
})
export class ReceiptJobOrdersComponent implements OnInit {
  rows = [];
  selected = [];
  jorow: Joborders[];
  JOUnreceipt: any[];
  loadingIndicator = true;
  selectedData: Joborders[] = [];
  form: FormGroup;
  formErrors: any;
  receipt: ReceiptJobOrders = {id: 0,    amount: 0,    jobOrder: null};
  id: number;

  constructor(
    private josvc: JobordersService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<ReceiptJobOrdersComponent>,
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
    this.josvc.getJOUnreceipt(id)
      .subscribe(rows => {
        this.JOUnreceipt = rows;
        console.log(this.JOUnreceipt);

        this.loadingIndicator = false;
      });
  }

  onSelect({ selected }) {
    // console.log(this.selected);
    // this.selectedData.splice(0, this.selectedData.length);
    this.selectedData.push(selected);
  }

  onActivate(event) {
    console.log('Event: activate', event);
  }

  goback() {
    this._location.back();
  }

  onSubmit(receiptjo: ReceiptJobOrders) {

    // console.log(this.jorow);
    this.dialogRef.close(receiptjo);
    // if (this.selectedData.length > 0)
    // {
    //     receiptjo.jobOrder = this.selectedData;
    // }
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
    // this.selected.push(this.rows[1], this.rows[3]);
    // console.log(this.selected);
    this.dialogRef.close(this.selected);
  }
}
