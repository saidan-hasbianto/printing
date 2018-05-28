import { Component, OnInit } from '@angular/core';
import { Msmarketing } from '../../models/msmarketing';
import { MsmarketingService } from '../../services/msmarketing.service';

@Component({
  selector: 'fuse-msmarketing',
  templateUrl: './msmarketing.component.html',
  styleUrls: ['./msmarketing.component.scss']
})
export class MsmarketingComponent implements OnInit {
  mktrow: Msmarketing[];
  loadingIndicator = true;
  selectedData: Msmarketing;
  constructor(
    private mktservice: MsmarketingService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.mktservice.getRows()
      .subscribe(rows => {
        this.mktrow = rows;
        this.loadingIndicator = false;
      });
  }

  // editData(msitem: Msitem): void {
  //   this.selectedData = msitem;
  //   this.router.navigate(['msitem-detail', msitem.id]);
  // }

  deleteRow(msitem: Msmarketing): void {
    if (confirm('Are you sure want to delete?')) {
      this.mktservice.delete(msitem).subscribe(res => {
        this.mktrow.splice(this.mktrow.indexOf(msitem), 1);
      });
    }
  }
}
