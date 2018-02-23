import { Component, OnInit, Inject } from '@angular/core';
import { ProductItemMaterial } from '../../models/product-item-material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Msitem } from '../../models/msitem';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MsitemService } from '../../services/msitem.service';

@Component({
  selector: 'app-msproduct-detail-itemform',
  templateUrl: './msproduct-detail-itemform.component.html',
  styleUrls: ['./msproduct-detail-itemform.component.scss']
})
export class MsproductDetailItemformComponent implements OnInit {
  proditem: ProductItemMaterial = {
    id: 0,  productName: '',  itemName: '',  qty: 0, product: null, item: null };
    form: FormGroup;
    formErrors: any;
    sub: any;
    msitem: Msitem[];
    itemOption = [];
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MsproductDetailItemformComponent>,
    private msitemsvc: MsitemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formErrors = {
      item: {},
      qty: {}
    };

    if (data) {
      this.proditem = data;
    }
  }

  ngOnInit() {
    this.msitemsvc.getRows().subscribe(res => this.itemOption = res);
    this.form = this.formBuilder.group({
      id: [this.proditem.id],
      // itemName: [this.proditem.itemName],
      item: [this.proditem.item],
      // product: [this.proditem.product],
      productName: [this.proditem.productName],
      qty: [this.proditem.qty]
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit(proditemmat: ProductItemMaterial) {
    // console.log(this.form.valueChanges);
    proditemmat.itemName = this.itemOption.find(x => x.id === proditemmat.item).name;
    this.dialogRef.close(proditemmat);
  }

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

}
