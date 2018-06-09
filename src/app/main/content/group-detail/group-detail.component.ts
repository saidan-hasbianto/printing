import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Groups } from '../../models/groups';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'fuse-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  groups: Groups = {id: null, name: null};
  sub: any;
  loadingbar = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private groupsvc: GroupService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService
  ) {
    this.formErrors = {
      name : {}
    };
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id : [''],
      name  : ['', Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.groupsvc.getGroup(id)
        .subscribe(res => {
          this.groups = res;
          console.log(res);
          console.log(this.groups);

        this.form.setValue({
          id: this.groups.id,
          name: this.groups.name
      });
    this.loadingbar = false;
  });
}});

this.form.valueChanges.subscribe(() => {
  this.onFormValuesChanged();
});
  }

  onFormValuesChanged()
  {
      for ( const field in this.formErrors )
      {
          if ( !this.formErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.formErrors[field] = {};

          // Get the control
          const control = this.form.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.formErrors[field] = control.errors;
          }
      }
  }

  goback() {
    this._location.back();
  }

  onSubmit(user: Groups) {
    if (this.form.valid)
    {
      if (user.id === '')
      {
        this.groupsvc.add(user).subscribe(
          success => {
            this.goback();
          },
          error => {
            console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          }
        );
      }
      else
      {
        this.groupsvc.update(user).subscribe(
          success => {
            this.goback();
          },
          error => {
            console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          }
        );
      }
    }
  }
}
