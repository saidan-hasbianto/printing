import { Component, OnInit } from '@angular/core';
import { DocprefixService } from '../../services/docprefix.service';
import { ToastrService } from 'ngx-toastr';
import { Docprefix } from '../../models/docprefix';

@Component({
  selector: 'fuse-docprefix',
  templateUrl: './docprefix.component.html',
  styleUrls: ['./docprefix.component.scss']
})
export class DocprefixComponent implements OnInit {
  rows: Docprefix[];
  loadingIndicator= true;
  selected = [];
  selectedData: Docprefix;
  constructor(
    private docsvc: DocprefixService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.docsvc.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
      });
  }

  onSelect({ selected }) {
    this.selectedData = this.selected[0];
  }

  deleteRow(msitem: Docprefix): void {
    if (confirm('Are you sure want to delete?')) {
      this.docsvc.delete(msitem).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msitem), 1);
      });
    }
  }
}
