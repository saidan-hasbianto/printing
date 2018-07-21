import { Component, OnInit } from '@angular/core';
import { JobordersService } from '../../services/joborders.service';
import { Joborders } from '../../models/joborders';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainform-jo-overdue',
  templateUrl: './mainform-jo-overdue.component.html',
  styleUrls: ['./mainform-jo-overdue.component.scss']
})
export class MainformJoOverdueComponent implements OnInit {
  jorow: Joborders[];
  loadingIndicator = true;
  constructor(
    private josvc: JobordersService,
    private dialogRef: MatDialogRef<MainformJoOverdueComponent>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.josvc.getJOOD()
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
