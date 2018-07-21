import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { MainformService } from '../../services/mainform.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MainformJoOverdueComponent } from '../mainform-jo-overdue/mainform-jo-overdue.component';
import { MainformLowqtyitemComponent } from '../mainform-lowqtyitem/mainform-lowqtyitem.component';

@Component({
  selector: 'fuse-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.scss']
})
export class MainformComponent implements OnInit {
  jorow: Joborders[];
  loadingIndicator = true;
  opj: string;
  odj: string;
  wpay: string;
  lqi: string;
  constructor(
    private mainsvc: MainformService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getRows();
    this.loadingIndicator = false;
  }

  getRows(): void {
    this.mainsvc.getRows()
      .subscribe(res => {
        console.log(res);
        this.jorow = res['joUndelivereds'];
        let i;
        for (i=0; i < this.jorow.length; i++)
        {
          if (this.jorow[i].remarks == 'null')
          {
            this.jorow[i].remarks = '-';
          }
        }
        
        
        this.opj = res['joUndeliveredCount'];
        this.odj = res['joOverDueCount'];
        this.wpay = res['joUnreceiptedCount'];
        this.lqi = res['lowQtyItem'];
      });

  }

  onUserEvent(event) {
    console.log(event);
    console.log(event.row.id);
    if ( event.type == "click" )
    {
      this.router.navigate(['/joborder-view/' + event.row.id]);
    }
    
  }

  GotoJoOD() {
    // this.dialog.open(MainformJoOverdueComponent, {
    //   width : '90%'
    // });
    this.router.navigate(['/mainformjood'])
  }

  Gotolqi() {
    this.router.navigate(['/mainformlqi'])
  }

  Gotowaipay() {
    this.router.navigate(['/mainformwaipay'])
  }

  GotoOpj() {
    this.router.navigate(['/mainformopj'])
  }
}
