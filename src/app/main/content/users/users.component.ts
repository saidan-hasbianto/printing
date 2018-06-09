import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../models/users';
import { Headers } from '@angular/http';
import { Id } from '../../models/Id';
import { LogErrorHandleService } from '../../services/log-error-handle.service';

@Component({
  selector: 'fuse-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  rows: Users[];
  loadingIndicator = true;

  selected = [];
  selectedData: Users;
  constructor(
    private userservice: UsersService,
    private toastrSvc: ToastrService,
    private logErrorHandle: LogErrorHandleService
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

  resetPassword(id): void {
    if (confirm('Apakah Anda yakin akan mengatur ulang password untuk user tersebut?')) {
        const oId: Id = { id : id };
        this.userservice.resetPassword(id, oId).subscribe(
          success => {
            this.logErrorHandle.log('Reset Password', ' Password berhasi diatur ulang', 0);
          },
          error => {
            const j_message = error.error;
            // this.onError(j_message.error_message);
            this.logErrorHandle.log('Error', j_message, 3);
          });
    };
  }
}
