import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msdeliveryaddr } from '../../models/msdeliveryaddr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PricelevelService } from '../../services/pricelevel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fuse-msdeliveryaddr-detail',
  templateUrl: './msdeliveryaddr-detail.component.html',
  styleUrls: ['./msdeliveryaddr-detail.component.scss']
})
export class MsdeliveryaddrDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  addr: Msdeliveryaddr = { id: 0, name: null, address: null, cp: null, contactNumber: null};
  sub: any;
  divVal = true;
  loadingbar = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pricelevelsvc: PricelevelService,
    private dialogRef: MatDialogRef<MsdeliveryaddrDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formErrors = {
      name : {},
      address : {},
      cp : {},
      contactNumber : {}
      };

      if (data) {
        this.addr = data;
      }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.addr.id],
      name: [this.addr.name],
      address : [this.addr.address, Validators.required],
      cp  : [this.addr.cp, Validators.required],
      contactNumber  : [this.addr.contactNumber, Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(addr: Msdeliveryaddr)
  {
    if (this.form.valid)
    {
      console.log(addr);
      this.dialogRef.close(addr);
    }
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

  onCancelClick() {
    this.dialogRef.close();
  }
}
