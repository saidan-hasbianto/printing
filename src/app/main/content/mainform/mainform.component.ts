import { Component, OnInit } from '@angular/core';
import { Joborders } from '../../models/joborders';
import { MainformService } from '../../services/mainform.service';

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
    private mainsvc: MainformService
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

        this.opj = res['joUndeliveredCount'];
        this.odj = res['joOverDueCount'];
        this.wpay = res['joUnreceiptedCount'];
        this.lqi = res['lowQtyItem'];
      });

  }

}
