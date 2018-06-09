import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  rows: Vendor[];
  temp = [];
  loadingIndicator = true;
  constructor(
    private vendorsvc: VendorService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.vendorsvc.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
        this.temp = [...rows];
      });
  }

  deleteRow(msprod: Vendor): void {
    if (confirm('Are you sure want to delete?')) {
      this.vendorsvc.delete(msprod).subscribe(res => {
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
      if (d && d.name)
      {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
