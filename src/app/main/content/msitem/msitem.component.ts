import { Component, OnInit } from '@angular/core';
import { Msitem } from '../../models/msitem';
import { MsitemService } from '../../services/msitem.service';
import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';

@Component({
  selector: 'fuse-msitem',
  templateUrl: './msitem.component.html',
  styleUrls: ['./msitem.component.scss']
})
export class MsitemComponent implements OnInit {
  rows: Msitem[];
  item: Msitem = {
    id : 1,
    itemCd : 'ITEM001',
    name : 'Screen Printing',
    descs : 'Screen Printing',
    minQty : 10,
    qty : 0
  };
  loadingIndicator = true;

  selected = [];
  selectedData: Msitem;
  constructor(
    private itemservice: MsitemService,
    // private router: Router,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.itemservice.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
      });
  }

  onSelect({ selected }) {
    this.selectedData = this.selected[0];
  }

  // editData(msitem: Msitem): void {
  //   this.selectedData = msitem;
  //   this.router.navigate(['msitem-detail', msitem.id]);
  // }

  deleteRow(msitem: Msitem): void {
    if (confirm('Are you sure want to delete?')) {
      this.itemservice.delete(msitem).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msitem), 1);
      });
    }
  }

  toastr(){
  this.toastrSvc.error('error');
  alert('error');
  }
}
