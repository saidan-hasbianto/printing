import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { JobordersService } from '../../services/joborders.service';

@Component({
  selector: 'app-joborders',
  templateUrl: './joborders.component.html',
  styleUrls: ['./joborders.component.scss']
})
export class JobordersComponent implements OnInit {
  jorow: Joborders[];
  loadingIndicator = true;

  selectedData: Joborders;

  statusOption = [
    {value: 'C', display_name: 'Create'},
    {value: 'W', display_name: 'Waiting'},
    {value: 'P', display_name: 'Pending'},
    {value: 'D', display_name: 'Done'}
  ];
  constructor(
    private josvc: JobordersService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {

    this.josvc.getRows()
      .subscribe(rows => {
        this.jorow = rows;
        if (this.jorow['status'] === 'C') {
        this.jorow['status'] = 'Create';
      }
      else if (this.jorow['status'] === 'W')
      {
        this.jorow['status'] = 'Working';
      }
      else if (this.jorow['status'] === 'P')
      {
        this.jorow['status'] = 'Pending';
      }
      else
      {
        this.jorow['status'] = 'Done';
      }
        this.loadingIndicator = false;
      });

  }

  deleteRow(msitem: Joborders): void {
    if (confirm('Are you sure want to delete?')) {
      this.josvc.delete(msitem).subscribe(res => {
        this.jorow.splice(this.jorow.indexOf(msitem), 1);
      });
    }
  }
}
