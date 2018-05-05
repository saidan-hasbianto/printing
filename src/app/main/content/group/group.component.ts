import { Component, OnInit } from '@angular/core';
import { Groups } from '../../models/groups';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
rows: Groups[];
group: Groups = {
  id : 1,
  url : '',
  name : ''
};
loadingIndicator: boolean = true;

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
}
