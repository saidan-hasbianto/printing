import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/users';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  user: Users = {url: null, username: null, email: null, password: null, groups: null};
  sub: any;
  loadingbar = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UsersService,
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
    this.form = this.formBuilder.group({
      username  : [this.user.username, Validators.required],
      email  : [this.user.email, Validators.required],
      password  : [this.user.password, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.userservice.getUser(id)
        .subscribe(res => {
          this.user = res;

        this.form.setValue({
          username: this.user.username,
          email: this.user.email,
          password  : this.user.password
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
  if (this.form.valid)
  {
    this.userservice.add(user).subscribe(
      success => {
        this.goback();
      },
      error => {
        console.log(error.error);
        this.toastr.error(error.error.error_message, 'Error');
      }
    );
    console.log(user);
  }
  }


}
