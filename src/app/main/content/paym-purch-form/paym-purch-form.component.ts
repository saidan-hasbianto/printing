import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PurchItemService } from '../../services/purch-item.service';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchItem } from '../../models/purch-item';
import { Location } from '@angular/common';

@Component({
  selector: 'app-paym-purch-form',
  templateUrl: './paym-purch-form.component.html',
  styleUrls: ['./paym-purch-form.component.scss']
})
export class PaymPurchFormComponent implements OnInit {
  form: FormGroup;
  type: string;
  isDelete: boolean;
  sub: any;
  loadingIndicator = true;
  _PurchItem: PurchItem[];
  selected = [];
  selectedData: PurchItem[] = [];
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private purchItemsvc: PurchItemService,
    private dialogRef: MatDialogRef<PaymPurchFormComponent>
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.purchItemsvc.getRows()
      .subscribe(rows => {
        this._PurchItem = rows;
        // let i;
        // for (i = 0; i < rows.length; i++)
        // {
        //   this._PurchItem[i].amount = this._PurchItem[i].purchaseItems[i].amount;
        // }
        this.loadingIndicator = false;
      });
  }

  goback() {
    this._location.back();
  }

  onCheckboxChange(event) {
    // We want to get back what the name of the checkbox represents, so I'm intercepting the event and
    // manually changing the value from true to the name of what is being checked.

    // check if the value is true first, if it is then change it to the name of the value
    // this way when it's set to false it will skip over this and make it false, thus unchecking
    // the box
    if (this.form.get(event.target.id).value) {
        this.form.patchValue({[event.target.id] : event.target.id}); // make sure to have the square brackets
    }
  }

  onSelect({ selected }) {
    // console.log(this.selected);
    // this.selectedData.splice(0, this.selectedData.length);
    this.selectedData.push(selected);
  }

  add() {
    // this.selected.push(this.rows[1], this.rows[3]);
    // console.log(this.selected);
    this.dialogRef.close(this.selected);
  }

}
