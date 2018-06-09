import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from '../../models/vendor';
import { Location } from '@angular/common';

@Component({
  selector: 'fuse-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  vend: Vendor;
  sub: any;
  loadingbar= true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vendorsvc: VendorService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.formErrors = {
      vendorCd : {},
      name : {},
      address : {},
      telp : {},
      cp : {}
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [0],
      vendorCd : ['', Validators.required],
      name  : ['', Validators.required],
      address  : ['', Validators.required],
      telp  : ['', Validators.required],
      fax  : [''],
      mobile  : [''],
      cp  : ['', Validators.required],
      email  : [''],
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.vendorsvc.getSingleVendor(id)
        .subscribe(res => {
          this.vend = res;

          this.form.setValue({
            id: this.vend.id,
            vendorCd: this.vend.vendorCd,
            name: this.vend.name,
            address: this.vend.address,
            fax: this.vend.fax,
            mobile: this.vend.mobile,
            cp: this.vend.cp,
            email: this.vend.email,
            telp: this.vend.telp
          });

          this.loadingbar = false;
      });
    }});
    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
    this.loadingbar = false;
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
    // this._location.prepareExternalUrl('/vendor');
  }

  onSubmit(prod: Vendor) {
  console.log(prod);
    if (this.form.valid) {

      if (prod.id === 0)
        {

          this.vendorsvc.add(prod).subscribe(
            success => {
              this.goback();
            },
            error => {
              // console.log(error.error);
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
          // this.goback();
        }
        else
        {
          this.vendorsvc.update(prod).subscribe(
            success => {
              this.goback();
            },
            error => {
              console.log(error.error);
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
          // this.goback();
        }
    }
  }
}
