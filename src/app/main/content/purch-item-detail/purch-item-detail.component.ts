import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchItemDetail } from '../../models/purch-item-detail';
import { PurchItem } from '../../models/purch-item';
import { PurchItemService } from '../../services/purch-item.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MsitemComponent } from '../msitem/msitem.component';
import { Vendor } from '../../models/vendor';
import { PurchItemFormComponent } from '../purch-item-form/purch-item-form.component';
import { Msitem } from '../../models/msitem';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'fuse-purch-item-detail',
  templateUrl: './purch-item-detail.component.html',
  styleUrls: ['./purch-item-detail.component.scss']
})
export class PurchItemDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  purchitem: PurchItem;
  purchitemDtls: PurchItemDetail[] = [];
  purchitemDtlsTmp: PurchItemDetail[];
  sub: any;
  loadingbar= true;
  vendOption: Vendor[];
  editing = {};
  selected = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private purchItemsvc: PurchItemService,
    private vendsvc: VendorService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.formErrors = {
      purchNo : {},
      purchDate : {},
      poNo : {},
      invoiceNo : {},
      refNo : {},
      vendor : {}
      };
  }

  ngOnInit() {
    this.vendsvc.getRows().subscribe(res => this.vendOption = res);
    this.form = this.formBuilder.group({
      id: 0,
      purchNo : ['', Validators.required],
      purchDate  : ['', Validators.required],
      poNo  : ['', Validators.required],
      invoiceNo  : ['', Validators.required],
      refNo:  ['', Validators.required],
      vendor:  ['', Validators.required],
      remarks: ['']
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.purchItemsvc.getSingle(id)
        .subscribe(res => {
          this.purchitem = res;

          this.form.setValue({
            id: this.purchitem.id,
            purchNo: this.purchitem.purchNo,
            purchDate: this.purchitem.purchDate,
            poNo: this.purchitem.poNo,
            invoiceNo: this.purchitem.invoiceNo,
            refNo: this.purchitem.refNo,
            vendor: this.purchitem.vendor,
          });

          this.purchitemDtls = res.purchaseItems;
          this.loadingbar = false;
      });
    }});
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goback() {
    this._location.back();
    // this._location.prepareExternalUrl('/purch-item');
  }

  addDtls() {
    const dialogRef = this.dialog.open(PurchItemFormComponent, {
      width : '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.purchitemDtlsTmp = result;


      // this.purchitemDtlsTmp.length = 0;
      // this.purchitemDtlsTmp.push(result);

      // // console.log(this.purchitemDtlsTmp);
      // const _PurchItem = new PurchItem();
      // let _PurchItemDetail: PurchItemDetail;

      let i;
      for (i = 0; i < this.purchitemDtlsTmp.length;)
      {
        // console.log(this.purchitemDtlsTmp[i][i]['itemCd']);
        // console.log(this.purchitemDtlsTmp[i][i]['name']);
        // _PurchItemDetail = new PurchItemDetail();
        // _PurchItemDetail.id = this.purchitemDtlsTmp[i][i]['itemCd'];
        // _PurchItemDetail.itemName = this.purchitemDtlsTmp[i][i]['name'];
        // _PurchItemDetail.item = this.purchitemDtlsTmp[i][i]['id'];
        // _PurchItemDetail.amount = 0;
        // _PurchItemDetail.qty = 0;
        // this.purchitemDtls.push(_PurchItemDetail);

        this.purchitemDtlsTmp[i]['amount'] = 0;
        this.purchitemDtlsTmp[i]['qty'] = 0;
        this.purchitemDtlsTmp[i]['item'] = this.purchitemDtlsTmp[i]['id'].toString();

        i++;
      }
      console.log(this.purchitemDtlsTmp);
    });
  }

  editDtls(msitem: PurchItemDetail) {
    const dialogRef = this.dialog.open(MsitemComponent,
      {
        data: msitem
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      const idx = this.purchitem.purchaseItems.indexOf(msitem);

      for (const prop in this.purchitemDtls[idx])
      {
        this.purchitemDtls[idx][prop] = res[prop];
      }
    });
  }

  deleteDtls(msitem: PurchItemDetail): void {
    if (confirm('Are you sure want to delete?')) {
        this.purchitemDtls.splice(this.purchitemDtls.indexOf(msitem), 1);
    }
  }

  onSubmit(prod: PurchItem) {
    console.log(prod);
    if (this.form.valid)
    {
      const datestring = prod.purchDate;
      const newDate = new Date(datestring);
      prod.purchDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

      if (this.purchitemDtlsTmp.length > 0 )
        {
          prod.purchaseItems = this.purchitemDtlsTmp;
        }
        else
        {
          alert('Please fill Purchase Items');
        }

      if (prod.id === 0)
        {
          this.purchItemsvc.add(prod).subscribe(
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
          this.purchItemsvc.update(prod).subscribe(
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

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.purchitemDtls[rowIndex][cell] = event.target.value;
    this.purchitemDtls = [...this.purchitemDtls];
    console.log('UPDATED!', this.purchitemDtls[rowIndex][cell]);
    console.log(this.purchitemDtls);
  }

}
