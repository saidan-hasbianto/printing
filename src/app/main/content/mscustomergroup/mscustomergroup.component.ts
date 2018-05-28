import { Component, OnInit } from '@angular/core';
import { Mscustomer } from '../../models/mscustomergroup';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-mscustomergroup',
  templateUrl: './mscustomergroup.component.html',
  styleUrls: ['./mscustomergroup.component.scss']
})
export class MscustomergroupComponent implements OnInit {
  prod: Mscustomer[];
  temp = [];
  loadingIndicator = true;
  constructor(
    private custservice: MscustomergroupService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.custservice.getRows()
      .subscribe(rows => {
        this.prod = rows;
        this.loadingIndicator = false;
        this.temp = [...rows];
      });
  }

  deleteRow(msprod: Mscustomer): void {
    if (confirm('Are you sure want to delete?')) {
      this.custservice.delete(msprod).subscribe(res => {
        this.prod.splice(this.prod.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }

  updateFilter(event) {
    console.log(event);
    let name = event.currentTarget.id;
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(d);
      if (d && d.name)
      {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.prod = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
