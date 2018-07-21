import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { JobordersService } from '../../services/joborders.service';

@Component({
  selector: 'fuse-joborders',
  templateUrl: './joborders.component.html',
  styleUrls: ['./joborders.component.scss']
})
export class JobordersComponent implements OnInit {
  jorow: Joborders[];
  loadingIndicator = true;
  temp = [];
  selectedData: Joborders;

  statusOption = [
    {value: 'C', display_name: 'Create'},
    {value: 'A', display_name: 'Admin'},
    {value: 'W', display_name: 'Working'},
    {value: 'D', display_name: 'Done'}
  ];
  constructor(
    private josvc: JobordersService
  ) { }

  ngOnInit() {
    this.getRows();
    this.loadingIndicator = false;
  }

  getRows(): void {
    this.josvc.getJOUndlvrd()
      .subscribe(rows => {
        this.jorow = rows;
        console.log(this.jorow);
        let i;
        for (i=0; i < this.jorow.length; i++)
        {
          if (this.jorow[i].status === 'C') {
            this.jorow[i].status = 'Create';
          }
          else if (this.jorow[i].status === 'A') {
            this.jorow[i].status = 'Admin';
          }
          else if (this.jorow[i].status === 'W') {
            this.jorow[i].status = 'Working';
          }
          else
          {
            this.jorow[i].status = 'Done';
          }
        }
        

        this.temp = [...rows];
      });

  }

  deleteRow(msitem: Joborders): void {
    if (confirm('Are you sure want to delete?')) {
      this.josvc.delete(msitem).subscribe(res => {
        this.jorow.splice(this.jorow.indexOf(msitem), 1);
      });
    }
  }

  updateFilter(event) {
    console.log(event);
    const jobOrderNo = event.currentTarget.id;
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(d);
      if (d && d.jobOrderNo)
      {
        return d.jobOrderNo.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.jorow = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
