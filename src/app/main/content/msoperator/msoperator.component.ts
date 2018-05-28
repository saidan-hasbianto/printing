import { Component, OnInit } from '@angular/core';
import { Msoperator } from '../../models/msoperator';
import { MsoperatorService } from '../../services/msoperator.service';

@Component({
  selector: 'fuse-msoperator',
  templateUrl: './msoperator.component.html',
  styleUrls: ['./msoperator.component.scss']
})
export class MsoperatorComponent implements OnInit {
  opsrow: Msoperator[];
  loadingIndicator = true;
  selectedData: Msoperator;
  constructor(
    private opsservice: MsoperatorService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.opsservice.getRows()
      .subscribe(rows => {
        this.opsrow = rows;
        this.loadingIndicator = false;
      });
  }

  // editData(msitem: Msitem): void {
  //   this.selectedData = msitem;
  //   this.router.navigate(['msitem-detail', msitem.id]);
  // }

  deleteRow(msitem: Msoperator): void {
    if (confirm('Are you sure want to delete?')) {
      this.opsservice.delete(msitem).subscribe(res => {
        this.opsrow.splice(this.opsrow.indexOf(msitem), 1);
      });
    }
  }

}
