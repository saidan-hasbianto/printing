import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Users } from '../../models/users';

@Component({
  selector: 'fuse-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastService: ToastrService,
    private _location: Location,
    private router: Router,
  ) {
    this.formErrors = {
      oldPassword : {},
      newPassword : {},
      confirmPassword : {}
    },
    this.form = formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
  }, {validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword')});
  }

  ngOnInit() {
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  save(usr: Users) {
    console.log(this.form.value);
    if (this.form.controls['newPassword'].value !== this.form.controls['confirmPassword'].value) {
      this.toastService.warning('New Password dan Confirm Password tidak sama');
      return;
    }

    const userId = localStorage.getItem('userid');
    if (userId) {
      this.userService.changePassword(userId, usr).subscribe(
        success => {
          this.toastService.success('Password berhasil diubah', 'SUCCESS');
          this.goback();
        },
        error => {
          console.log(error);
          const j_message = error.error;
          this.toastService.error(j_message.error_message, 'ERROR');
        }
      );
    }else {
      console.log('tidak ada');
    }
  }

  goback() {
    // this._location.back();
    this.router.navigate(['mainform']);
  }
}
