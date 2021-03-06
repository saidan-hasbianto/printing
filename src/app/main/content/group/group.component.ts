import { Component, OnInit } from '@angular/core';
import { Groups } from '../../models/groups';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
rows: Groups[];
group: Groups = {
  id : null,
  name : null
};
loadingIndicator = true;

constructor(
  private groupService: GroupService,
  private toastrSvc: ToastrService
) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.groupService.getRows()
      .subscribe(rows => {
        this.rows = rows;
        this.loadingIndicator = false;
      });
    }

  deleteRow(msitem: Groups): void {
    if (confirm('Are you sure want to delete?')) {
      this.groupService.delete(msitem).subscribe(res => {
        this.rows.splice(this.rows.indexOf(msitem), 1);
      });
    }
  }
}
