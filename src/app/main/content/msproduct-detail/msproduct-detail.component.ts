import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msitem } from '../../models/msitem';
import { Msproduct } from '../../models/msproduct';
import { Pricelevel } from '../../models/pricelevel';
import { ProductItemMaterial } from '../../models/product-item-material';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MsproductService } from '../../services/msproduct.service';
import { ProductItemMaterialService } from '../../services/product-item-material.service';
import { PricelevelService } from '../../services/pricelevel.service';
import { Location } from '@angular/common';
import { MsproductDetailItemformComponent } from '../msproduct-detail-itemform/msproduct-detail-itemform.component';
import { PricelevelDetailComponent } from '../pricelevel-detail/pricelevel-detail.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-msproduct-detail',
  templateUrl: './msproduct-detail.component.html',
  styleUrls: ['./msproduct-detail.component.scss']
})
export class MsproductDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;

  item: Msitem[];
  prod: Msproduct = { id: 0, priceLevels : null, productItems : null, productCd : '', name : '', descs : '', minQty : 0 };
  pricelevel1: Pricelevel[] = [];
  proditem: ProductItemMaterial[] = [];

  sub: any;
  loadingbar= true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prodservice: MsproductService,
    private pricelevel: PricelevelService,
    private itemservice: ProductItemMaterialService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.formErrors = {
      productCd : {},
      name : {},
      descs : {},
        minQty : {}
      };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.prod.id],
      productCd : [this.prod.productCd, Validators.required],
      name  : [this.prod.name, Validators.required],
      descs  : [this.prod.descs, Validators.required],
      minQty  : [this.prod.minQty, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.prodservice.getProd(id)
        .subscribe(res => {
          this.prod = res;

          this.form.setValue({
            id: this.prod.id,
            productCd: this.prod.productCd,
            name: this.prod.name,
            descs: this.prod.descs,
            minQty: this.prod.minQty
          });

          this.pricelevel1 = res.priceLevels;
          this.proditem = res.productItems;
          this.loadingbar = false;
      });
    }});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
    this.loadingbar = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(prod: Msproduct) {
    console.log(this.pricelevel1);
    if (this.form.valid) {
      if (this.pricelevel1.length > 0 )
      {
        prod.priceLevels = this.pricelevel1;
      }
      else
      {
        alert('Please fill Price Level');
      }
      if (this.proditem.length > 0)
      {
        prod.productItems = this.proditem;
      }
      else
      {
        alert('Please fill Product Item Material');
      }

      if (prod.id === 0)
        {
          this.prodservice.add(prod).subscribe(
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
          this.prodservice.update(prod).subscribe(
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

  deleteItem(msitem: ProductItemMaterial): void {
    if (confirm('Are you sure want to delete?')) {
        this.proditem.splice(this.proditem.indexOf(msitem), 1);
    }
  }

  deletePrice(msitem: Pricelevel): void {
    if (confirm('Are you sure want to delete?')) {
        this.pricelevel1.splice(this.pricelevel1.indexOf(msitem), 1);
    }
  }

  addPrice() {
    const dialogRef = this.dialog.open(PricelevelDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.pricelevel1.push(result);
    });
  }

  addItem(){
    const dialogRef = this.dialog.open(MsproductDetailItemformComponent);
    dialogRef.afterClosed().subscribe(res => {
       this.proditem.push(res);
    });
  }

  editItem(msitem: ProductItemMaterial) {
    const dialogRef = this.dialog.open(MsproductDetailItemformComponent,
      {
        data: msitem
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      let idx = this.prod.productItems.indexOf(msitem);

      // for (var prop in this.prod.productItems[idx]) {
      //   this.prod.productItems[idx][prop] = res[prop];
      // }

      for (var prop in this.proditem[idx]) {
        this.proditem[idx][prop] = res[prop];
      }
    });
  }

  editPrice(msitem: Pricelevel) {
    const dialogRef = this.dialog.open(PricelevelDetailComponent,
      {
        data: msitem
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      let idx = this.prod.priceLevels.indexOf(msitem);

      for (var prop in this.prod.priceLevels[idx]) {
        this.prod.priceLevels[idx][prop] = res[prop];
      }
    });
  }
}
