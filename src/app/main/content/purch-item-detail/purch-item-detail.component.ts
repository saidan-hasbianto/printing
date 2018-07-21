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
import { MsitemService } from '../../services/msitem.service';

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
  singleitem: Msitem;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private purchItemsvc: PurchItemService,
    private vendsvc: VendorService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private itemservice: MsitemService,
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
      width : '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!this.purchitemDtlsTmp) //new
      {
        for (let i = 0; i < result.length;i++)
        {
          result[i]['amount'] = '0.00';
          result[i]['qty'] = '0.00';
        }
        this.purchitemDtlsTmp = result;
      }
      else //edit
      {
        for (let i = 0; i < result.length;i++)
        {
          result[i]['amount'] = '0.00';
          //result[i]['qty'] = '0.00';
          this.purchitemDtlsTmp.push(result[i]);
        }
      }
    });
  }

  editDtls(msitem: PurchItemDetail) {
    const dialogRef = this.dialog.open(MsitemComponent,
      {
        width: '50%',
        data: msitem
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      const idx = this.purchitem.purchaseItems.indexOf(msitem);

      for (const prop in this.purchitemDtlsTmp[idx])
      {
        this.purchitemDtlsTmp[idx][prop] = res[prop];
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
    if (event.target.value < 0 || !event.target.value)
    {
      this.toastr.error('0.00 not allowed', 'Error');
      this.purchitemDtlsTmp[rowIndex][cell] = '0.00';
    }
    else
    {
      this.purchitemDtlsTmp[rowIndex][cell] = event.target.value;
    }
    this.purchitemDtlsTmp = [...this.purchitemDtlsTmp];
  }

  updateQty(event, cell, rowIndex) {

    this.itemservice.getItem(this.purchitemDtlsTmp[rowIndex].id)
    .subscribe(result => this.singleitem = result);
    console.log(this.singleitem);
    this.editing[rowIndex + '-' + cell] = false;
    if (event.target.value < 0 || !event.target.value || event.target.value < this.singleitem['minQty'])
    {
      this.toastr.error('Min Qty is ' + this.purchitemDtlsTmp[rowIndex].minQty, 'Error');
      this.purchitemDtlsTmp[rowIndex][cell] = this.singleitem['minQty'];
    }
    else
    {
      this.purchitemDtlsTmp[rowIndex][cell] = event.target.value;
    }
    this.purchitemDtlsTmp = [...this.purchitemDtlsTmp];
  }

}
