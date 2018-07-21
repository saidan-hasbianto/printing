import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { JobordersService } from '../../services/joborders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainform-wai-pay',
  templateUrl: './mainform-wai-pay.component.html',
  styleUrls: ['./mainform-wai-pay.component.scss']
})
export class MainformWaiPayComponent implements OnInit {
  jorow: Joborders[];
  constructor(
    private josvc: JobordersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.josvc.getRowsJoUnreceipt()
      .subscribe(rows => {
        this.jorow = rows;
        console.log(this.jorow);
      }
    );
  }

  close() {
    // this.dialogRef.close();
    this.router.navigate(['/mainform'])
  }

}
