import { Component, OnInit } from '@angular/core';
import { Msproduct } from '../../models/msproduct';
import { MsproductService } from '../../services/msproduct.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-msproduct',
  templateUrl: './msproduct.component.html',
  styleUrls: ['./msproduct.component.scss']
})
export class MsproductComponent implements OnInit {
  prod: Msproduct[];
  loadingIndicator = true;
  constructor(
    private prodservice: MsproductService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.prodservice.getRows()
      .subscribe(rows => {
        this.prod = rows;
        this.loadingIndicator = false;
      });
  }

  deleteRow(msprod: Msproduct): void {
    if (confirm('Are you sure want to delete?')) {
      this.prodservice.delete(msprod).subscribe(res => {
        this.prod.splice(this.prod.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
