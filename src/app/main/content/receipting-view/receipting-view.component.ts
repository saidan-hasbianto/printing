import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Receipting } from '../../models/receipting-list';
import { ReceiptingListService } from '../../services/receipting-list.service';
import { Joborders } from '../../models/joborders';
import { Location } from '@angular/common';

@Component({
  selector: 'app-receipting-view',
  templateUrl: './receipting-view.component.html',
  styleUrls: ['./receipting-view.component.scss']
})
export class ReceiptingViewComponent implements OnInit {
  form: FormGroup;
  loadingbar= true;
  sub: any;
  resep: Receipting = {id: null, receiptNo: null, receiptDate: null, receiptJobOrders: null, remarks: null, customerName: null};
  jo: Joborders[];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private receiptsvc: ReceiptingListService,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id : [''],
      receiptNo  : [''],
      receiptDate  : [''],
      remarks  : [''],
      customer  : [''],
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.receiptsvc.getReceipt(id)
        .subscribe(res =>
          {
            this.resep = res;
            console.log(this.resep);
            this.form.setValue({
              id: id,
              receiptNo: this.resep.receiptNo,
              receiptDate: this.resep.receiptDate,
              remarks: this.resep.remarks,
              customer: this.resep.customerName
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

    // this.form.valueChanges.subscribe(() => {
    //   this.onFormValuesChanged();
    // });
    this.loadingbar = false;
  }

  goback() {
    this._location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
