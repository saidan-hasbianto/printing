import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../models/users';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  rows: Users[];
  loadingIndicator: boolean = true;

  selected = [];
  selectedData: Users;
  constructor(
    private userservice: UsersService,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit() {
    this.getRows();
    // console.log(this.rows.length);
  }

  getRows(): void {
    this.userservice.getRows()
      .subscribe(res => {
        this.rows = res;
        this.loadingIndicator = false;
              console.log(res.length);
      });


    }

  onSelect({ selected }) {
    this.selectedData = this.selected[0];
  }

  deleteRow(msitem: Users): void {
    if (confirm('Are you sure want to delete?')) {
      this.userservice.delete(msitem).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msitem), 1);
      });
    }
  }
}
