import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { Router } from '@angular/router';
import { JobordersService } from '../../services/joborders.service';

@Component({
  selector: 'app-mainform-opj',
  templateUrl: './mainform-opj.component.html',
  styleUrls: ['./mainform-opj.component.scss']
})
export class MainformOpjComponent implements OnInit {
  jorow: Joborders[];
  constructor(
    private josvc: JobordersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.josvc.getJOUndlvrd()
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
