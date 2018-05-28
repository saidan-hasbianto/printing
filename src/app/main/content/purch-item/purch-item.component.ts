import { Component, OnInit } from '@angular/core';
import { PurchItem } from '../../models/purch-item';
import { PurchItemService } from '../../services/purch-item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-purch-item',
  templateUrl: './purch-item.component.html',
  styleUrls: ['./purch-item.component.scss']
})
export class PurchItemComponent implements OnInit {
purchitem: PurchItem[];
loadingIndicator = true;
  constructor(
    private purchItemsvc: PurchItemService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.purchItemsvc.getRows()
      .subscribe(rows => {
        this.purchitem = rows;
        this.loadingIndicator = false;
      });
  }

  deleteRow(msprod: PurchItem): void {
    if (confirm('Are you sure want to delete?')) {
      this.purchItemsvc.delete(msprod).subscribe(res => {
        this.purchitem.splice(this.purchitem.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
