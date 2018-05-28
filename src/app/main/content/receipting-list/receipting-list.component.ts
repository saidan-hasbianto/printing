import { Component, OnInit } from '@angular/core';
import { ReceiptingList, Receipting } from '../../models/receipting-list';
import { ReceiptingListService } from '../../services/receipting-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-receipting-list',
  templateUrl: './receipting-list.component.html',
  styleUrls: ['./receipting-list.component.scss']
})
export class ReceiptingListComponent implements OnInit {
  rows: Receipting[];
  temp = [];

  loadingIndicator = true;
  constructor(
    private receiptsvc: ReceiptingListService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.receiptsvc.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
        this.temp = [...rows];
      });
  }

  deleteRow(msprod: Receipting): void {
    if (confirm('Are you sure want to delete?')) {
      this.receiptsvc.delete(msprod).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }

  updateFilter(event) {
    console.log(event);
    // let receiptNo = event.currentTarget.id;
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      if (d && d.receiptNo)
      {
        return d.receiptNo.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
