import { Component, OnInit } from '@angular/core';
import { ReceiptingList } from '../../models/receipting-list';
import { ReceiptingListService } from '../../services/receipting-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receipting-list',
  templateUrl: './receipting-list.component.html',
  styleUrls: ['./receipting-list.component.scss']
})
export class ReceiptingListComponent implements OnInit {
  rows: ReceiptingList[];

  loadingIndicator: boolean = true;
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
      });
  }

  deleteRow(msprod: ReceiptingList): void {
    if (confirm('Are you sure want to delete?')) {
      this.receiptsvc.delete(msprod).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
