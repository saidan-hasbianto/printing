import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MarkupreleasesService } from '../../services/markupreleases.service';
import { Markupreleases, Markupreleases2 } from '../../models/markupreleases';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { MsactivityService } from '../../services/msactivity.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-markupreleases',
  templateUrl: './markupreleases.component.html',
  styleUrls: ['./markupreleases.component.scss']
})
export class MarkupreleasesComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  sub: any;
  loadingbar = true;
  mu: Markupreleases[];
  mu2: Markupreleases2[];

  loadingIndicator: boolean = true;
  temp = [];

  constructor(
    private musvc: MarkupreleasesService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.musvc.getRows()
      .subscribe(rows => {
        this.mu = rows;
        this.loadingIndicator = false;
        this.temp = [...rows];
      });
  }

  deleteRow(msprod: Markupreleases2): void {
    if (confirm('Are you sure want to delete?')) {
      this.musvc.delete(msprod).subscribe(res => {
        this.mu2.splice(this.mu2.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }

  updateFilter(event) {
    console.log(event);
    const customerName = event.currentTarget.id;
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(d);
      if (d && d.customerName)
      {
        return d.customerName.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.mu = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
