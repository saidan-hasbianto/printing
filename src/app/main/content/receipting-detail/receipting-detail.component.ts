import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { ReceiptingList } from '../../models/receipting-list';
import { ReceiptJobOrders } from '../../models/receipt-job-orders';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReceiptingListService } from '../../services/receipting-list.service';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-receipting-detail',
  templateUrl: './receipting-detail.component.html',
  styleUrls: ['./receipting-detail.component.scss']
})
export class ReceiptingDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;

  jo: Joborders[];
  receipt: ReceiptingList = { id: 0, receiptJobOrders : null, customerName : null, receiptNo : '', receiptDate : '', remarks : '', customer : null };
  receiptjo: ReceiptJobOrders[] = [];
  // pricelevel1: Pricelevel[] = [];
  // proditem: ProductItemMaterial[] = [];

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
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.receipt.id],
      receiptJobOrders : [this.receipt.receiptJobOrders, Validators.required],
      customerName  : [this.receipt.customerName, Validators.required],
      receiptNo  : [this.receipt.receiptNo, Validators.required],
      receiptDate  : [this.receipt.receiptDate, Validators.required],
      remarks  : [this.receipt.remarks, Validators.required],
      customer  : [this.receipt.customer, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.receiptsvc.getItem(id)
        .subscribe(res => {
          this.receipt = res;

          this.form.setValue({
            id: this.receipt.id,
            receiptJobOrders: this.receipt.receiptJobOrders,
            customerName: this.receipt.customerName,
            receiptNo: this.receipt.receiptNo,
            receiptDate: this.receipt.receiptDate,
            remarks: this.receipt.remarks,
            customer: this.receipt.customer
          });

          // this.pricelevel1 = res.priceLevels;
          // this.proditem = res.productItems;
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

  onSubmit(prod: ReceiptingList) {
    // console.log(this.pricelevel1);
    if (this.form.valid) {
      if (prod.id === 0)
        {
          this.receiptsvc.add(prod).subscribe(
            success => {
              this.goback();
            },
            error => {
              // console.log(error.error);
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
          // this.goback();
        }
        else
        {
          this.receiptsvc.update(prod).subscribe(
            success => {
              this.goback();
            },
            error => {
              console.log(error.error);
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
          // this.goback();
        }

    }
  }

  deleteReceiptItem(receiptItem: ReceiptJobOrders): void {
    if (confirm('Are you sure want to delete?')) {
        this.receiptjo.splice(this.receiptjo.indexOf(receiptItem), 1);
    }
  }

  // addReceiptItem() {
  //   const dialogRef = this.dialog.open(PricelevelDetailComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.pricelevel1.push(result);
  //   });
  // }
}
