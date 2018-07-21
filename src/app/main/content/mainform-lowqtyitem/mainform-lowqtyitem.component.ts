import { Component, OnInit } from '@angular/core';
import { Msitem } from '../../models/msitem';
import { MainformService } from '../../services/mainform.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainform-lowqtyitem',
  templateUrl: './mainform-lowqtyitem.component.html',
  styleUrls: ['./mainform-lowqtyitem.component.scss']
})
export class MainformLowqtyitemComponent implements OnInit {
  row: Msitem[];
  constructor(
    private mainsvc: MainformService,
    private dialogRef: MatDialogRef<MainformLowqtyitemComponent>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.mainsvc.getlqi()
      .subscribe(rows => {
        this.row = rows;
        console.log(this.row);
      }
    );
  }

  close() {
    //this.dialogRef.close();
    this.router.navigate(['/mainform'])
  }

}
