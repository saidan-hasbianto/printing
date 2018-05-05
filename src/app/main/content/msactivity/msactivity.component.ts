import { Component, OnInit } from '@angular/core';
import { Msactivity } from '../../models/msactivity';
import { MsactivityService } from '../../services/msactivity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-msactivity',
  templateUrl: './msactivity.component.html',
  styleUrls: ['./msactivity.component.scss']
})
export class MsactivityComponent implements OnInit {
activityrow: Msactivity[];
loadingIndicator = true;

selectedData: Msactivity;
  constructor(
    private actservice: MsactivityService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.actservice.getRows()
      .subscribe(rows => {
        this.activityrow = rows;
        this.loadingIndicator = false;
      });
  }

  // editData(msitem: Msitem): void {
  //   this.selectedData = msitem;
  //   this.router.navigate(['msitem-detail', msitem.id]);
  // }

  deleteRow(msitem: Msactivity): void {
    if (confirm('Are you sure want to delete?')) {
      this.actservice.delete(msitem).subscribe(res => {
        this.activityrow.splice(this.activityrow.indexOf(msitem), 1);
      });
    }
  }
}
