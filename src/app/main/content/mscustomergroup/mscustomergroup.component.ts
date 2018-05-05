import { Component, OnInit } from '@angular/core';
import { Mscustomer } from '../../models/mscustomergroup';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mscustomergroup',
  templateUrl: './mscustomergroup.component.html',
  styleUrls: ['./mscustomergroup.component.scss']
})
export class MscustomergroupComponent implements OnInit {
  prod: Mscustomer[];
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
}
