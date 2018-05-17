import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msdeliveryaddr } from '../../models/msdeliveryaddr';
import { Mscustomer } from '../../models/mscustomergroup';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { MsdeliveryaddrService } from '../../services/msdeliveryaddr.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Msmarketing } from '../../models/msmarketing';
import { Location } from '@angular/common';
import { MsdeliveryaddrDetailComponent } from '../msdeliveryaddr-detail/msdeliveryaddr-detail.component';
import { MsmarketingService } from '../../services/msmarketing.service';

@Component({
  selector: 'app-mscustomergroup-detail',
  templateUrl: './mscustomergroup-detail.component.html',
  styleUrls: ['./mscustomergroup-detail.component.scss']
})
export class MscustomergroupDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;

  dlvaddr: Msdeliveryaddr[] = [];
  mkt: Msmarketing[];
  cust: Mscustomer = { id: 0, customerCd : null, name : null, level : null, marketing : null,
    address : null, cp : null, email : null, telp : null, fax : null, mobile : null, deliveryAddresses : null };

  sub: any;
  loadingbar= true;
  mktOption = [];
  levelOption = [
    {value: '1', display_name: 'Level 1'},
    {value: '2', display_name: 'Level 2'},
    {value: '3', display_name: 'Level 3'},
    {value: '4', display_name: 'Level 4'},
    {value: '5', display_name: 'Level 5'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private custservice: MscustomergroupService,
    private dlvaddrsvc: MsdeliveryaddrService,
    private mktsvc: MsmarketingService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.formErrors = {
      customerCd : {},
      name : {},
      address : {},
      // email : {},
      telp : {},
      // fax : {},
      // mobile : {},
      cp : {},
      level : {},
      marketing : {}
      };
  }

  ngOnInit() {
    this.mktsvc.getRows().subscribe(res => this.mktOption = res);
    this.form = this.formBuilder.group({
      id: [this.cust.id],
      customerCd : [this.cust.customerCd, Validators.required],
      name  : [this.cust.name, Validators.required],
      address  : [this.cust.address, Validators.required],
      telp  : [this.cust.telp, Validators.required],
      fax  : [this.cust.fax],
      mobile  : [this.cust.mobile],
      cp  : [this.cust.cp, Validators.required],
      email  : [this.cust.email],
      marketing  : [this.cust.marketing],
      level  : [this.cust.level]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.custservice.getProd(id)
        .subscribe(res => {
          this.cust = res;

          this.form.setValue({
            id: this.cust.id,
            customerCd: this.cust.customerCd,
            name: this.cust.name,
            address: this.cust.address,
            fax: this.cust.fax,
            mobile: this.cust.mobile,
            cp: this.cust.cp,
            email: this.cust.email,
            telp: this.cust.telp,
            marketing  : this.cust.marketing,
            level  : this.cust.level
          });

          this.dlvaddr = res.deliveryAddresses;
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
  }

  deletedlvaddr(msdlvaddr: Msdeliveryaddr): void {
    if (confirm('Are you sure want to delete?')) {
        this.dlvaddr.splice(this.dlvaddr.indexOf(msdlvaddr), 1);
    }
  }

  adddlvaddr() {
    const dialogRef = this.dialog.open(MsdeliveryaddrDetailComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.dlvaddr.push(res);
    });
  }

  editdlvaddr(msdlvaddr: Msdeliveryaddr) {
    const dialogRef = this.dialog.open(MsdeliveryaddrDetailComponent,
      {
        data: msdlvaddr
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      let idx = this.cust.deliveryAddresses.indexOf(msdlvaddr);

      for (var prop in this.cust.deliveryAddresses[idx]) {
        this.cust.deliveryAddresses[idx][prop] = res[prop];
      }
    });
  }

  onSubmit(prod: Mscustomer) {
    console.log(this.dlvaddr);
    if (this.form.valid) {
      if (this.dlvaddr.length > 0)
      {
        prod.deliveryAddresses = this.dlvaddr;
        console.log(prod);
      }
      else
      {
        alert('Please fill Delivery Address');
      }

      if (prod.id === 0)
        {
          this.custservice.add(prod).subscribe(
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
          console.log('update');
          this.custservice.update(prod).subscribe(
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
