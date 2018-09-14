import { Component, OnInit } from '@angular/core';
import { Paymentreceipts } from '../../models/paymentreceipts';
import { PaymentreceiptsService } from '../../services/paymentreceipts.service';

@Component({
  selector: 'app-paymentreceipt-list',
  templateUrl: './paymentreceipt-list.component.html',
  styleUrls: ['./paymentreceipt-list.component.scss']
})
export class PaymentreceiptListComponent implements OnInit {
  rows: Paymentreceipts[];
  temp = [];

  loadingIndicator = true;
  constructor(
    private paymentreceiptsvc: PaymentreceiptsService,
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.paymentreceiptsvc.getRows()
      .subscribe(rows => {
        console.log(rows);
        
        this.rows = rows;
        this.loadingIndicator = false;
        this.temp = [...rows];
      });
  }

  deleteRow(obj: Paymentreceipts): void {
    if (confirm('Are you sure want to delete?')) {
      this.paymentreceiptsvc.delete(obj).subscribe(res => {
        this.rows.splice(this.rows.indexOf(obj), 1);
      });
    }
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
