import { Component, OnInit } from '@angular/core';
import { Msitem } from '../../models/msitem';
import { ToastrService } from 'ngx-toastr';
import { MsitemService } from '../../services/msitem.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-purch-item-form',
  templateUrl: './purch-item-form.component.html',
  styleUrls: ['./purch-item-form.component.scss']
})
export class PurchItemFormComponent implements OnInit {
  rows: Msitem[];
  loadingIndicator = true;
  selected = [];
  selectedData: Msitem[] = [];
  constructor(
    private itemservice: MsitemService,
    private toastrSvc: ToastrService,
    private dialogRef: MatDialogRef<PurchItemFormComponent>,
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.itemservice.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
      });
  }

  onSelect({ selected }) {
    // console.log(this.selected);
    // this.selectedData.splice(0, this.selectedData.length);
    this.selectedData.push(selected);
  }

  add() {
    this.dialogRef.close(this.selected);
  }

}
