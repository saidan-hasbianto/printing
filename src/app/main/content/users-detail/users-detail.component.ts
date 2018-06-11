import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/users';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { GroupService } from '../../services/group.service';
import { Groups } from '../../models/groups';

@Component({
  selector: 'fuse-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  user: Users = {id: null, url: null, username: null, email: null, password: null, oldpassword: null, newpassword: null, first_name: null, last_name: null, groups: null};
  sub: any;
  loadingbar = true;
  groupOption: Groups[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UsersService,
    private groupsvc: GroupService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService
  ) {
    this.formErrors = {
      username : {},
      email : {},
      password : {}
    };
  }

  ngOnInit() {
    this.groupsvc.getRows().subscribe(res => this.groupOption = res);
    this.form = this.formBuilder.group({
      id : [''],
      username  : ['', Validators.required],
      email  : ['', Validators.required],
      password  : ['-', Validators.required],
      first_name : [''],
      last_name : [''],
      groups: ['']
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;
        this.form.controls['password'].disable();
        this.userservice.getUser(id)
        .subscribe(res => {
          this.user = res;
          console.log(this.user);
        this.form.setValue({
          id: this.user.id,
          username: this.user.username,
          email: this.user.email,
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          password: '-',
          groups: this.user.groups[0]
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

  onSubmit(user: Users) {

  if (this.form.controls['groups'].value === '')
  {
    this.toastr.warning('Please choose groups');
  }
  else {
    let usr: Users;
    usr = new Users();
    usr.id = user.id;
    usr.email = user.email;
    usr.first_name = user.first_name;
    usr.last_name = user.last_name;
    usr.password = '-';
    usr.username = user.username;
    usr.groups = [];
    usr.groups.push(this.form.controls['groups'].value);

    if (this.form.valid)
    {
      if (user.id === '')
      {

        this.userservice.add(usr).subscribe(
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
        this.userservice.update(usr).subscribe(
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


}
