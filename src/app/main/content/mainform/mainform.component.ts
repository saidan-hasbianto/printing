import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { JobordersService } from '../../services/joborders.service';

@Component({
  selector: 'fuse-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.scss']
})
export class MainformComponent implements OnInit {
  jorow: Joborders[];
  loadingIndicator = true;
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
        this.loadingIndicator = false;
        console.log(this.jorow);
      });

  }

}
