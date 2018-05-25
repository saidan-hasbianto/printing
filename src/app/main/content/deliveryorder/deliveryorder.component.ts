import { Component, OnInit } from '@angular/core';
import { Deliveryorder } from '../../models/deliveryorder';
import { DeliveryorderService } from '../../services/deliveryorder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-deliveryorder',
  templateUrl: './deliveryorder.component.html',
  styleUrls: ['./deliveryorder.component.scss']
})
export class DeliveryorderComponent implements OnInit {
  rows: Deliveryorder[];
  loadingIndicator= true;
  selected = [];
  selectedData: Deliveryorder;
  constructor(
    private dosvc: DeliveryorderService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.dosvc.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
      });
  }

  onSelect({ selected }) {
    this.selectedData = this.selected[0];
  }

  deleteRow(msitem: Deliveryorder): void {
    if (confirm('Are you sure want to delete?')) {
      this.dosvc.delete(msitem).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msitem), 1);
      });
    }
  }
}
