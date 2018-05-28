import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CashbookService } from '../../services/cashbook.service';
import { ToastrService } from 'ngx-toastr';
import { Cashbook } from '../../models/cashbook';

@Component({
  selector: 'fuse-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.scss']
})
export class CashbookComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  sub: any;
  loadingbar = true;
  loadingIndicator = true;
  temp = [];
  cb: Cashbook[];
  constructor(
    private cbsvc: CashbookService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.cbsvc.getRows()
      .subscribe(rows => {
        this.cb = rows;
        this.loadingIndicator = false;
        this.temp = [...rows];
      });
  }

  deleteRow(msprod: Cashbook): void {
    if (confirm('Are you sure want to delete?')) {
      this.cbsvc.delete(msprod).subscribe(res => {
        this.cb.splice(this.cb.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }

  updateFilter(event) {
    console.log(event);
    const descr = event.currentTarget.descs;
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(d);
      if (d && d.descr)
      {
        return d.descr.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.cb = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
